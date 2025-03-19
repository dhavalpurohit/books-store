import { Component } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { RegisterModalComponent } from "../register-modal/register-modal.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { apiEndpoint } from "../../config";
import { APIService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { ToastService } from '../../services/toast-service';

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  imports: [FormsModule, CommonModule, TranslateModule],
})
export class LoginModalComponent {  
  constructor(
    public activeModal: NgbActiveModal,
    private apiService: APIService,
    private authService: AuthService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) { }

  email: string = "";
  password: string = "";
  errorMessage: string = "";
  showPassword: boolean = false;

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = await this.translateService.get("REQUIRED_EMAIL_PASSWORD").toPromise();
      return;
    }

    this.apiService.httpPostRequest(apiEndpoint.USER_LOGIN, {
      email: this.email, password: this.password
    }).then(async (res: any) => {
      if (res?.payload?.authToken) {
        this.authService.setToken(res?.payload?.authToken);
        this.toastService.successToast('LOGIN_SUCCESSFUL', true);
        this.closeModal();
      } else {
        this.errorMessage = await this.translateService.get("INVALID_CREDENTIAL").toPromise();
        this.toastService.errorToast(this.errorMessage);
      }
    }).catch(async (error) => {
      console.error("Login Error:", error);
      this.errorMessage = await this.translateService.get("LOGIN_FAILED").toPromise();
      this.toastService.errorToast(this.errorMessage);
    });
  } 

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  openRegisterModal() {
    this.closeModal();
    this.modalService.open(RegisterModalComponent, {
      centered: true,
      backdrop: "static",
    });
  }
}