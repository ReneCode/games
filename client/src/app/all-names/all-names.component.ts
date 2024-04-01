import { Component } from "@angular/core";
import { WebSocketService } from "../web-socket.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-all-names",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./all-names.component.html",
  styleUrl: "./all-names.component.scss",
})
export class AllNamesComponent {
  users$ = this.webSocketService.getUsers$();

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService = webSocketService;
  }
}
