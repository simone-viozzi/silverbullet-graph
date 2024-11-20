import { CodeWidgetContent } from "@silverbulletmd/silverbullet/types";
import {
  asset,
  datastore,
  editor,
  system,
} from "@silverbulletmd/silverbullet/syscalls";

import { compile as gitIgnoreCompiler } from "gitignore-parser";

export async function getGraphSettings(): Promise<{
  fileFilterFn: (filename: string) => boolean;
  excludeTags: string[];
}> {
  const config = await system.getSpaceConfig();

  const excludeRegex = config.graph?.excludeRegex || [];
  const excludeTags = config.graph?.excludeTags || [];

  // Compila il filtro gitignore
  const fileFilterFn = gitIgnoreCompiler(excludeRegex.join("\n")).accepts;

  console.log("Compiled fileFilterFn:", fileFilterFn);
  console.log("Exclude Tags:", excludeTags);

  return {
    fileFilterFn,
    excludeTags,
  };
}

export async function saveGraph() {
  // Ottieni le impostazioni del grafo
  const { fileFilterFn, excludeTags } = await getGraphSettings();

  // Recupera tutte le pagine usando `index.queryObjects`
  const pages = await system.invokeFunction("index.queryObjects", "page") as {
    name: string;
    tags: string[];
    created: string;
    lastModified: string;
  }[];

  console.log("pages ok");

  // Filtra le pagine basandosi sul filtro file e sui tag esclusi
  const filteredPages = pages.filter(
    (page) =>
      fileFilterFn(page.name) &&
      !page.tags.some((tag) => excludeTags.includes(tag)),
  );

  console.log("pages filtered");

  // Recupera tutti i link dal datastore
  const allLinks = await datastore.query({ type: "link" });

  console.log("link ok");

  // Costruisci i collegamenti
  const links = allLinks
    .filter((entry) => {
      try {
        // Controlla che i valori esistano e siano stringhe non vuote
        const source = entry.value?.page;
        const target = entry.value?.toPage;

        if (
          !source || typeof source !== "string" || !target ||
          typeof target !== "string"
        ) {
          console.warn("Invalid link entry:", entry);
          return false;
        }

        // Applica il filtro file
        return fileFilterFn(source) && fileFilterFn(target);
      } catch (err) {
        console.error("Error processing link entry:", entry, err);
        return false;
      }
    })
    .map((entry) => ({
      source: entry.value.page,
      target: entry.value.toPage,
    }));

  console.log("links filtered");

  // Costruisci i nodi con i metadati delle pagine
  const nodes = filteredPages.map((page) => ({
    id: page.name,
    title: page.name,
    tags: page.tags,
    created: page.created,
    lastModified: page.lastModified,
  }));

  // Struttura finale del grafo
  const graphData = {
    nodes,
    links,
  };

  console.log("Generated graph data:", JSON.stringify(graphData, null, 2));

  // Salva il grafo nel datastore
  await datastore.set(["graph", "main"], graphData);

  console.log("Graph saved to datastore:", graphData);
  await editor.flashNotification("Graph saved to datastore!");
}

// Comando per eliminare i dati del grafo dal datastore
export async function clearGraphData() {
  // Elimina i dati associati alla chiave fissa
  await datastore.del(["graph", "main"]);

  // Notifica l'utente
  await editor.flashNotification("Graph data cleared from datastore!");
}

export async function widget(
  _bodyText: string,
  _pageName: string,
): Promise<CodeWidgetContent> {
  const graphData = await datastore.get(["graph", "main"]);

  if (!graphData) {
    return {
      html:
        `<div>Graph data not found in datastore. Please save a graph first!</div>`,
    };
  }

  // Carica il file JS come asset
  const graphWidgetJs = await asset.readAsset(
    "graph",
    "assets/graph_widget.js",
  );

  return {
    html:
      `<div id="graph-container" style="width: 100%; height: 500px; border: 1px solid #ccc;"></div>`,
    script: `
      loadJsByUrl("https://d3js.org/d3.v7.min.js").then(() => {
        ${graphWidgetJs}
        renderGraph(${JSON.stringify(graphData)});
      });
    `,
  };
}
