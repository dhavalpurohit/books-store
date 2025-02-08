import { Component } from "@angular/core";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
  imports: [NgbDropdownModule],
})
export class NavbarComponent {}
