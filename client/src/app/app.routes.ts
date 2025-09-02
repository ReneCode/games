import { Routes } from "@angular/router";
import { Game31Component } from "./game31/game31.component";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "g31/:id", component: Game31Component },
];
