import http from "http";
import { Server, Socket } from "socket.io";
import Debug from "debug";
import { UserManager } from "./UserManager";

const debug = Debug("relang:websocket");

function startWebSocketServer(httpServer: http.Server) {
  debug("Starting WebSocket server");

  const io = new Server(httpServer, { cors: { origin: "*" } });
  const userManager = new UserManager();

  io.on("connection", (socket: Socket) => {
    debug("A user connected", socket.id);

    userManager.addUser(socket.id, "Anonymous");
    emitUserList();

    socket.on("setusername", (name: string) => {
      debug("set user name:", socket.id, name);
      userManager.setUserName(socket.id, name);
      emitUserList();
    });

    socket.on("message", (data: any) => {
      debug("Received message:", socket.id, data);

      // Broadcast the message to all connected clients
      io.emit("message", data);
    });

    // Handle disconnections
    socket.on("disconnect", () => {
      debug("A user disconnected", socket.id);
      userManager.removeUser(socket.id);
      emitUserList();
    });
  });

  const emitUserList = () => {
    io.emit("userlist", Array.from(userManager.getUsers()));
  };
}

export { startWebSocketServer };
