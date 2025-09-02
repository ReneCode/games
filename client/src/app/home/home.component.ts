import { Component } from "@angular/core";
import { AllNamesComponent } from "../all-names/all-names.component";
import { ChangeNameComponent } from "../change-name/change-name.component";
import { CommonModule } from "@angular/common";
import { nanoid } from "nanoid";
import { WebSocketService } from "../web-socket.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, ChangeNameComponent, AllNamesComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  constructor(
    private webSocketService: WebSocketService,
    private router: Router
  ) {}

  enterGame() {
    const id = nanoid();

    this.router.navigate(["/g31", id]);
  }
}
