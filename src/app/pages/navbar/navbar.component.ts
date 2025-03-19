import { Component, Renderer2, ViewChild } from "@angular/core";
import { NgbDropdownModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { LoginModalComponent } from "../login-modal/login-modal.component";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { defaultLang, languages } from "../../config";
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
  imports: [NgbDropdownModule, TranslateModule, CommonModule],
})
export class NavbarComponent {
  @ViewChild("content") loginModal: any;

  selectedLanguage: string = defaultLang; // Default value
  isLoggedIn: boolean = false;
  languages: any = languages;

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    private modalService: NgbModal,
    public authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    const langCode = languages.map(x => x.code);
    this.translate.addLangs(langCode); // Add supported languages
    this.translate.setDefaultLang(this.selectedLanguage); // Set default language

    const browserLang: any = this.translate.getBrowserLang();
    if(langCode.includes(browserLang)) {
      this.selectedLanguage = browserLang;
    }
    this.changeLanguage(this.selectedLanguage);
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(lang);
    this.renderer.setAttribute(document.documentElement, "lang", lang);
  }

  openLoginModal() {
    this.modalService.open(LoginModalComponent, {
      centered: true, // Center the modal
      backdrop: "static", // Prevent closing when clicking outside
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']); // Replace 'profile' with your actual route
  }

  logOut() {
     this.authService.logout()
     this.toastService.successToast('LOGOUT_SUCCESSFUL', true);
  }
}
