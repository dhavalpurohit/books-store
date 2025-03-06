import { Component } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { RegisterModalComponent } from "../register-modal/register-modal.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { apiEndpoint } from "../../config";
import { APIService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  imports: [FormsModule, CommonModule, TranslateModule],
})
export class LoginModalComponent {

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: APIService,
    private authService: AuthService, // Inject AuthService
    private modalService: NgbModal
  ) { }

  email: string = "";
  password: string = "";
  errorMessage: string = "";
  showPassword: boolean = false;

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = "Please enter email and password.";
      return;
    }

    this.apiService.httpPostRequest(apiEndpoint.USER_LOGIN, {
      email: this.email, password: this.password
    }).then((res: any) => {
      console.log("Login Success:", res.payload.authToken);

      if (res?.payload?.authToken) {
        this.authService.setToken(res?.payload?.authToken);
        this.closeModal();
      } else {
        this.errorMessage = "Invalid login credentials.";
      }
    }).catch((error) => {
      console.error("Login Error:", error);
      this.errorMessage = "Login failed. Please check your credentials.";
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