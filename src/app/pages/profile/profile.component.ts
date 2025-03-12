import { Component } from '@angular/core';
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { apiEndpoint } from "../../config";
import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [NgbAccordionModule, FormsModule, CommonModule, TranslateModule],
})
export class ProfileComponent {

  constructor(private apiService: APIService) { }
  
  public offers: any[] = [];

  ngOnInit() {
    this.getOffers();
  }

  setDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/book_not_found.jpg';
  }

  
  getOffers() {
    this.apiService.httpGetRequest(apiEndpoint.OFFER_GET_ALL).then((res: any) => {
      console.log("res ", res);
      if (res?.statusCode == 200 && res?.payload?.offers) {
        this.offers = res?.payload?.offers;
      }
    }).catch((error: any) => {
      console.error(error);
      throw error;
    });
  }


}
