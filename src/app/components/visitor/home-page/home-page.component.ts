import { Component, OnInit } from "@angular/core";
import { Visitor } from "src/app/classes/visitor";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
  selectedVisitor: Visitor;

  constructor() {}

  ngOnInit() {}

  onSelectedVisitor(visitor: Visitor) {
    this.selectedVisitor = visitor;
  }
}
