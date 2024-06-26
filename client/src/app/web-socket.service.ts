import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { io } from "socket.io-client";

import { environment } from "../environments/environment";
import { User } from "./types";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket = io(environment.webSocketUrl);

  private users$ = new Subject<User[]>();
  private message$ = new Subject();

  constructor() {
    console.log("WebSocketService", environment.webSocketUrl);

    this.socket.on("connect", () => {
      console.log("connected to server");
      this.message$.next("connected to server");
    });

    this.socket.on("disconnect", () => {
      console.log("disconnected from server");
      this.message$.next("disconnected from server");
      this.message$.complete();
    });

    this.socket.on("message", (message: string) => {
      this.message$.next(message);
      console.log(`received message: ${message}`);
    });

    this.socket.on("userlist", (users: User[]) => {
      this.users$.next(users);
    });
  }

  getMessage$() {
    return this.message$.asObservable();
  }

  getUsers$() {
    return this.users$.asObservable();
  }

  sendMessage(message: string) {
    this.socket.emit("message", message);
  }

  setUserName(userName: string) {
    this.socket.emit("setusername", userName);
  }
}
