import { CodeWidgetContent } from "@silverbulletmd/silverbullet/types";
import {
  asset,
  datastore,
  editor,
} from "@silverbulletmd/silverbullet/syscalls";

// Comando per salvare un grafo nel datastore
export async function saveGraph() {
  const graphData = {
    nodes: [
      { id: "Node1", group: 1 },
      { id: "Node2", group: 1 },
      { id: "Node3", group: 2 },
    ],
    links: [
      { source: "Node1", target: "Node2" },
      { source: "Node2", target: "Node3" },
    ],
  };

  // Salva il grafo nel datastore con chiave fissa
  await datastore.set(["graph", "main"], graphData);

  // Notifica l'utente
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
