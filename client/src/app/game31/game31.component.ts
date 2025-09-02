import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

@Component({
  selector: "app-game31",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./game31.component.html",
  styleUrl: "./game31.component.scss",
})
export class Game31Component {
  public gameId$ = this.route.paramMap.pipe(map((params) => params.get("id")));

  constructor(private route: ActivatedRoute) {}
}
