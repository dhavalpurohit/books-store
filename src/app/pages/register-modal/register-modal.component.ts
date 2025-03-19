import { Component } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { APIService } from "../../services/api.service";
import { apiEndpoint } from "../../config";
import { AuthService } from "../../services/auth.service";
import { ToastService } from '../../services/toast-service';
import { LoginModalComponent } from "../login-modal/login-modal.component";

@Component({
  selector: "app-register-modal",
  templateUrl: "./register-modal.component.html",
  imports: [FormsModule, CommonModule, TranslateModule],
})
export class RegisterModalComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private apiService: APIService,
    private authService: AuthService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) { }

  name: string = "";
  email: string = "";
  password: string = "";
  errorMessage: string = "";
  showPassword: boolean = false;

  onRegister() {
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = "Please enter email and password.";
      this.toastService.errorToast(this.errorMessage);
      return;
    }

    this.apiService.httpPostRequest(apiEndpoint.USER_REGISTER, {
      name: this.name,
      email: this.email,
      password: this.password
    }).then(async (res: any) => {
      if (res?.payload?.authToken) {
        this.authService.setToken(res?.payload?.authToken);
        this.toastService.successToast('REGISTERED_SUCCESSFULLY', true);
        this.closeModal();
      } else {
        this.errorMessage = await this.translateService.get("REGISTRATION_FAILED").toPromise();
        this.toastService.errorToast(this.errorMessage);
      }
    }).catch(async (error: any) => {
      console.error("Registration Error:", error);
      this.errorMessage = await this.translateService.get("REGISTRATION_FAILED").toPromise();
      this.toastService.errorToast(this.errorMessage);
    }
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  openLoginModal() {
    this.closeModal();
    this.modalService.open(LoginModalComponent, {
      centered: true,
      backdrop: "static",
    });
  }
}