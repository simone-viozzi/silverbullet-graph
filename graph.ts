import { CodeWidgetContent } from "@silverbulletmd/silverbullet/types";
import {
  asset,
  datastore,
  editor,
  space,
  system,
} from "@silverbulletmd/silverbullet/syscalls";

import { compile as gitIgnoreCompiler } from "gitignore-parser";

export async function getGraphSettings(): Promise<{
  fileFilterFn: (filename: string) => boolean;
  excludeTags: string[];
}> {
  // Leggi le impostazioni dal file SETTINGS.md
  const excludeRegex =
    (await system.getSpaceConfig("graph.excludeRegex", [])) as string[];
  const excludeTags =
    (await system.getSpaceConfig("graph.excludeTags", [])) as string[];

  // Compila il filtro gitignore
  const fileFilterFn = gitIgnoreCompiler(excludeRegex.join("\n")).accepts;

  return {
    fileFilterFn,
    excludeTags,
  };
}

export async function saveGraph() {
  // Recupera la configurazione dello spazio per il filtro gitignore
  const spaceConfig = await space.getConfig();
  const fileFilterFn = gitIgnoreCompiler(spaceConfig.spaceIgnore).accepts;

  // Recupera tutte le pagine nello spazio
  const pages = (await space.listPages()).filter((page) =>
    fileFilterFn(page.name)
  );

  // Recupera tutti i link salvati nel datastore
  const allLinks = await datastore.query({ type: "link" });

  // Filtro: prendi solo i link con il tag "link" e una destinazione valida
  const links = allLinks
    .filter((entry) => entry.value.tag === "link" && entry.value.toPage?.trim())
    .map((entry) => ({
      source: entry.value.page, // La pagina di origine
      target: entry.value.toPage, // La pagina di destinazione
    }))
    .filter((link) => fileFilterFn(link.source) && fileFilterFn(link.target)); // Filtra i link basati sulle pagine incluse

  // Costruisci i nodi con metadati delle pagine
  const nodes = pages.map((page) => ({
    id: page.name,
    title: page.name, // Puoi arricchire con ulteriori metadati
    tags: page.tags || [],
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
