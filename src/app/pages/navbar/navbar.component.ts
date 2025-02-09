import { Component, Renderer2 } from "@angular/core";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
  imports: [NgbDropdownModule, TranslateModule],
})
export class NavbarComponent {
  selectedLanguage: string = "en"; // Default value

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2
  ) {
    this.translate.addLangs(["en", "de"]); // Add supported languages
    this.translate.setDefaultLang("en"); // Set default language
    const browserLang = this.translate.getBrowserLang();
    const lang = browserLang?.match(/en|de/) ? browserLang : "en";
    this.changeLanguage(lang);
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
}
