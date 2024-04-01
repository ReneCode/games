import { Component } from "@angular/core";
import { WebSocketService } from "../web-socket.service";

@Component({
  selector: "app-change-name",
  standalone: true,
  imports: [],
  templateUrl: "./change-name.component.html",
  styleUrl: "./change-name.component.scss",
})
export class ChangeNameComponent {
  username: string = "";

  constructor(private webSocketService: WebSocketService) {}

  public onChangeName(name: string) {
    this.webSocketService.setUserName(name);
  }
}
