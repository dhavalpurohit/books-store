import { Component } from '@angular/core';
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { apiEndpoint } from "../../config";
import { APIService } from '../../services/api.service';
import { ToastService } from '../../services/toast-service';
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [NgbAccordionModule, FormsModule, CommonModule, TranslateModule],
})
export class ProfileComponent {

  constructor(private apiService: APIService, private toastService: ToastService,     public authService: AuthService) { }

  public offers: any[] = [];
  public userDetail: any = {};
  
  first_name: string = ""; 
  last_name: string = ""; 
  bank_account: string = ""; 
  ifsc: string = ""; 
  city: string = ""; 
  postal_code: string = ""; 
  
  ngOnInit() {
    this.getOffers();
    this.getProfile();
  }

  setDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/book_not_found.jpg';
  }

  getProfile() {
    this.apiService.httpGetRequest(apiEndpoint.PROFILE_GET).then((res: any) => {
      if (res?.statusCode == 200 && res?.payload?.userDetail) {
        this.userDetail = res?.payload?.userDetail;

        this.first_name = this.userDetail.first_name || "";
        this.last_name = this.userDetail.last_name || "";
        this.bank_account = this.userDetail.bank_account || "";
        this.ifsc = this.userDetail.ifsc || "";
        this.city = this.userDetail.city || "";
        this.postal_code = this.userDetail.postal_code || "";

        console.log("this.userDetail", this.userDetail)
      }
    }).catch((error: any) => {
      console.error(error);
      throw error;
    });
  }

  updateProfile() {
    const updatedProfileData = {
      first_name: this.first_name,
      last_name: this.last_name,
      bank_account: this.bank_account,
      ifsc: this.ifsc,
      city: this.city,
      postal_code: this.postal_code
    };

    this.apiService.httpPostRequest(apiEndpoint.PROFILE_UPDATE, updatedProfileData).then((res: any) => {
      if (res?.statusCode == 200) {
        this.toastService.successToast('PROFILE_UPDATED_SUCCESSFULLY', true);
        this.getProfile();
        this.getOffers();
      }
    }).catch((error: any) => {
      console.error(error);
      this.toastService.errorToast(error);
      throw error;
    });
  }

  getOffers() {
    this.apiService.httpGetRequest(apiEndpoint.OFFER_GET_ALL).then((res: any) => {
      if (res?.statusCode == 200 && res?.payload?.offers) {
        this.offers = res?.payload?.offers;
      }
    }).catch((error: any) => {
      console.error(error);
      throw error;
    });
  }

  deleteOffer(productId: any) {
    this.apiService.httpPostRequest(apiEndpoint.OFFER_UPDATE, {
      gtin: `${productId}`,
      state: "deleted",
    }).then((res: any) => {
      if (res?.statusCode == 200) {
        this.toastService.successToast('OFFER_UPDATED_SUCCESSFULLY', true);
        this.getOffers();
      }
    }).catch((error: any) => {
      console.error(error);
      this.toastService.errorToast(error);
      throw error;
    });
  }

  logOut() {
    this.authService.logout()
    this.toastService.successToast('LOGOUT_SUCCESSFUL', true);
 }
}