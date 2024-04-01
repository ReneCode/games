import http from "http";
import { Server, Socket } from "socket.io";

function startWebSocketServer(httpServer: http.Server) {
  const io = new Server(httpServer);

  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    socket.on("message", (data) => {
      console.log("Received message:", data);

      // Broadcast the message to all connected clients
      io.emit("message", data);
    });

    // Handle disconnections
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}

export { startWebSocketServer };
