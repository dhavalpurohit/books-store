import { Component } from "@angular/core";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProductService } from "../../services/product.service";

// Import services
import { APIService } from "../../services/api.service";
import { apiEndpoint } from "../../config";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  imports: [NgbAccordionModule, FormsModule, CommonModule],
})
export class HomeComponent {
  public productId: string = "";
  public productDetail: any = {};
  public offers: any[] = [];

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

  constructor(
    private apiService: APIService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    this.productService.getOffers().subscribe({
      next: (response) => {
        console.log("loadOffers", response);
        this.offers = response.data;
      },
      error: (error) => {
        console.error("Error fetching offers:", error);
      },
    });
  }

  searchProduct() {
    this.productDetail = {};
    console.log("searchProduct : ", this.productId);
    this.apiService
      .httpPostRequest(apiEndpoint.GET_PRODUCT, {
        id: this.productId,
      })
      .then((res: any) => {
        console.log("res ", res);
        if (res?.statusCode == 200 && res?.response?.productData) {
          this.productDetail = res?.response?.productData;
        }
        console.log("this.productDetail : ", this.productDetail);
      })
      .catch((error: any) => {
        console.error(error);
        throw error;
      });
  }
}
