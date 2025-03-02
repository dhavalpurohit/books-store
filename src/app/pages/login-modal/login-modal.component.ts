import { Component } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RegisterModalComponent } from "../register-modal/register-modal.component";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.css"],
  imports: [FormsModule, CommonModule],
})
export class LoginModalComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  email: string = "";
  password: string = "";
  errorMessage: string = "";
  showPassword: boolean = false;

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = "Please enter email and password.";
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log("Login Success:", response.response.authToken);

        if (response.response.authToken) {
          this.authService.handleLoginSuccess(response);
          this.closeModal();
        } else {
          this.errorMessage = "Invalid login credentials.";
        }
      },
      (error) => {
        console.error("Login Error:", error);
        this.errorMessage = "Login failed. Please check your credentials.";
      }
    );
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
