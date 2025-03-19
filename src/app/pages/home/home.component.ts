import { Component } from "@angular/core";
import { NgbAccordionModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { APIService } from "../../services/api.service";
import { apiEndpoint } from "../../config";
import { TranslateModule } from "@ngx-translate/core";
import { ToastService } from '../../services/toast-service';
import { RegisterModalComponent } from "../register-modal/register-modal.component";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  imports: [NgbAccordionModule, FormsModule, CommonModule, TranslateModule],
})
export class HomeComponent {
  public productId: string = "";
  public productDetail: any = {};
  isConfirmed: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private modalService: NgbModal,
    private apiService: APIService,
    private toastService: ToastService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  setDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/book_not_found.jpg';
  }

  searchProduct() {
    this.productDetail = {};

    const id = this.productId.replaceAll(/\s/g, '').replaceAll('-', '');
    this.apiService.httpPostRequest(apiEndpoint.PRODUCT_GET, {
      id
    }).then((res: any) => {
      if (res?.statusCode == 200 && res?.payload?.productData) {
        this.productDetail = res?.payload?.productData;
      } else {
        this.toastService.errorToast('NO_DATA_FOUND', true);
      }
    }).catch((error: any) => {
      console.error(error);
      throw error;
    });
  }

  offerUpdate() {
    if (this.isConfirmed) {
      if(!this.isLoggedIn) {
        this.openRegisterModal();
      } else {
        this.apiService.httpPostRequest(apiEndpoint.OFFER_UPDATE, {
          gtin: `${this.productDetail?.id}`,
          state: "marketplace",
        }).then((res: any) => {
          if (res?.statusCode == 200) {
            this.toastService.successToast('OFFER_UPDATED_SUCCESSFULLY', true);
            this.productDetail = {};
          }
        }).catch((error: any) => {
          console.error(error);
          this.toastService.errorToast(error);
          throw error;
        });
      }
    }
  }

  openRegisterModal() {
    this.modalService.open(RegisterModalComponent, {
      centered: true,
      backdrop: "static",
    });
  }
}