import { Component } from "@angular/core";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { APIService } from "../../services/api.service";
import { apiEndpoint } from "../../config";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  imports: [NgbAccordionModule, FormsModule, CommonModule, TranslateModule],
})
export class HomeComponent {
  public productId: string = "";
  public productDetail: any = {};
  public offers: any[] = [];

  constructor(private apiService: APIService) { }

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
      console.log("this.productDetail : ", this.productDetail);
    }).catch((error: any) => {
      console.error(error);
      throw error;
    });
  }

  searchProduct() {
    this.productDetail = {};
    console.log("searchProduct : ", this.productId);
    this.apiService.httpPostRequest(apiEndpoint.PRODUCT_GET, {
      id: this.productId,
    }).then((res: any) => {
      console.log("res ", res);
      if (res?.statusCode == 200 && res?.payload?.productData) {
        this.productDetail = res?.payload?.productData;
      }
      console.log("this.productDetail : ", this.productDetail);
    }).catch((error: any) => {
      console.error(error);
      throw error;
    });
  }

  offerUpdate() {
    this.apiService.httpPostRequest(apiEndpoint.OFFER_UPDATE, {
      gtin: `${this.productDetail?.id}`,
      state: "marketplace",
    }).then((res: any) => {
      console.log("res ", res);
      if (res?.statusCode == 200) {
        this.getOffers();
        this.productDetail = {};
      }
    }).catch((error: any) => {
      console.error(error);
      throw error;
    });
  }
}