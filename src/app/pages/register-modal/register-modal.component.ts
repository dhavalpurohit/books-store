import { Component } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-register-modal",
  templateUrl: "./register-modal.component.html",
  styleUrls: ["./register-modal.component.css"],
  imports: [FormsModule, CommonModule],
})
export class RegisterModalComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

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

    this.authService.register(this.name, this.email, this.password).subscribe(
      (response) => {
        console.log("Registration Successful:", response.response.authToken);

        if (response.response.authToken) {
          this.authService.handleLoginSuccess(response);
          this.closeModal();
        } else {
          this.errorMessage = "Invalid Registration credentials.";
        }
      },
      (error) => {
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
