import { Component } from "@angular/core";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  imports: [NgbAccordionModule],
})
export class HomeComponent {
  steps = [
    {
      title: "1. Dein Angebot",
      description: "Lorem ipsum dolor sit amet consectetur.",
      icon: "search",
    },
    {
      title: "2. Verpackung",
      description: "Lorem ipsum dolor sit amet consectetur.",
      icon: "box",
    },
    {
      title: "3. Zahlung",
      description: "Lorem ipsum dolor sit amet consectetur.",
      icon: "card",
    },
  ];
}
