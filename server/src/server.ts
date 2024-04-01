import http from "http";
import { Request, Response } from "express";

import Debug from "debug";

const debug = Debug("relang:express");

function startHttpServer(): http.Server {
  const express = require("express");

  const app = express();

  app.use(express.json());

  const port = process.env.PORT || 8080; // default port to listen

  app.get("/", (req: Request, res: Response) => {
    let result = "Hello world. This is: relang-server.";
    res.send(`<code>${result}</code>`);
  });

  const server: http.Server = http.createServer(app);

  server.listen(port, () => {
    debug("Server listen to port:", port);
  });
  return server;
}

export { startHttpServer };
