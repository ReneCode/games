import { Component } from "@angular/core";
import { ActivatedRoute, Route, Router, RouterOutlet } from "@angular/router";

import { WebSocketService } from "./web-socket.service";
import { CommonModule } from "@angular/common";
import { ChangeNameComponent } from "./change-name/change-name.component";
import { AllNamesComponent } from "./all-names/all-names.component";
import { nanoid } from "nanoid";
import { HomeComponent } from "./home/home.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, HomeComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  // handleSendMessage() {
  //   const message: string = "hello from the client!";
  //   this.webSocketService.sendMessage(message);
  // }
}
