import { startHttpServer } from "./server";
import { startWebSocketServer } from "./websocket";

async function main() {
  console.log("multi-user starting ...");

  const server = startHttpServer();
  startWebSocketServer(server);
}

main();
