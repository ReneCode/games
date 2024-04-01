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

  app.listen(port, () => {
    console.log("server listen to port:", port);
  });
}

export { startHttpServer };
