import WebSocket from "ws";

function startWebSocketServer(server: any) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (message: string) => {
      console.log(`Received message: ${message}`);
      ws.send(`You sent: ${message}`);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
}

export { startWebSocketServer };
