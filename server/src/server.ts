import { Request, Response } from "express";

function startHttpServer() {
  const express = require("express");

  const app = express();

  app.use(express.json());

  const port = process.env.PORT || 8080; // default port to listen

  app.get("/", (req: Request, res: Response) => {
    let result = "Hello world. This is: relang-server.";
    res.send(`<code>${result}</code>`);
  });

  const server = app.listen(port, () => {
    console.log("Server listen to port:", port);
  });
  return server;
}

export { startHttpServer };
