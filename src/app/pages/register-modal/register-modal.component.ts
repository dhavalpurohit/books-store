import { Component } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { APIService } from "../../services/api.service";
import { apiEndpoint } from "../../config";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register-modal",
  templateUrl: "./register-modal.component.html",
  imports: [FormsModule, CommonModule, TranslateModule],
})
export class RegisterModalComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private apiService: APIService,
    private authService: AuthService
  ) { }

  name: string = "";
  email: string = "";
  password: string = "";
  errorMessage: string = "";
  showPassword: boolean = false;

  onRegister() {
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = "Please enter email and password.";
      return;
    }

    this.apiService.httpPostRequest(apiEndpoint.USER_REGISTER, {
      name: this.name,
      email: this.email,
      password: this.password
    }).then((res: any) => {
      console.log("Registration Successful:", res?.payload?.authToken);

      if (res?.payload?.authToken) {
        this.authService.setToken(res?.payload?.authToken);
        this.closeModal();
      } else {
        this.errorMessage = "Invalid Registration credentials.";
      }
    }).catch((error: any) => {
      console.error("Registration Error:", error);
      this.errorMessage = "Registration failed.";
    }
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}