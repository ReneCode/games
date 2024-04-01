import http from "http";
import { Server, Socket } from "socket.io";
import Debug from "debug";

const debug = Debug("relang:websocket");

function startWebSocketServer(httpServer: http.Server) {
  debug("Starting WebSocket server");

  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket: Socket) => {
    debug("A user connected", socket.id);

    socket.on("message", (data: any) => {
      debug("Received message:", socket.id, data);

      // Broadcast the message to all connected clients
      io.emit("message", data);
    });

    // Handle disconnections
    socket.on("disconnect", () => {
      debug("A user disconnected", socket.id);
    });
  });
}

export { startWebSocketServer };
