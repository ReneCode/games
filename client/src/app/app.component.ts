import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { WebSocketService } from "./web-socket.service";
import { CommonModule } from "@angular/common";
import { ChangeNameComponent } from "./change-name/change-name.component";
import { AllNamesComponent } from "./all-names/all-names.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, ChangeNameComponent, AllNamesComponent],
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

  enterGame() {
    console.log("start game");
  }
}
