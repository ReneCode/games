import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { WebSocketService } from "./web-socket.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "client";

  public message$ = this.webSocketService.getMessage$();

  constructor(private webSocketService: WebSocketService) {}

  handleSendMessage() {
    const message: string = "hello from the client!";
    this.webSocketService.sendMessage(message);
  }
}
