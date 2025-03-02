import { Component, Renderer2, ViewChild } from "@angular/core";
import { NgbDropdownModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { LoginModalComponent } from "../login-modal/login-modal.component";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
  imports: [NgbDropdownModule, TranslateModule, CommonModule],
})
export class NavbarComponent {
  @ViewChild("content") loginModal: any;

  selectedLanguage: string = "en"; // Default value
  isLoggedIn: boolean = false;

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.translate.addLangs(["en", "de"]); // Add supported languages
    this.translate.setDefaultLang("en"); // Set default language
    const browserLang = this.translate.getBrowserLang();
    const lang = browserLang?.match(/en|de/) ? browserLang : "en";
    this.changeLanguage(lang);
  }

  ngOnInit() {
    // this.checkLoginStatus();
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  // checkLoginStatus() {
  //   this.isLoggedIn = !!localStorage.getItem("userToken");
  // }

  logout() {
    this.authService.logout();
    // this.isLoggedIn = false;
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(lang);

    // Set direction based on language (RTL for Arabic, LTR for English)
    const direction = lang === "de" ? "rtl" : "ltr";

    // Update <html> tag attributes dynamically
    this.renderer.setAttribute(document.documentElement, "lang", lang);
    this.renderer.setAttribute(document.documentElement, "dir", direction);
  }

  openLoginModal() {
    this.modalService.open(LoginModalComponent, {
      centered: true, // Center the modal
      backdrop: "static", // Prevent closing when clicking outside
    });
  }
}
