import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms"; // ✅ Required for ngModel
import { HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './pages/toast/toast.component';
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./pages/navbar/navbar.component";
import { LoginModalComponent } from "./pages/login-modal/login-modal.component";
import { RegisterModalComponent } from "./pages/register-modal/register-modal.component";
import { TermsModalComponent } from './pages/terms-modal/terms-modal.component'
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginModalComponent,
    RegisterModalComponent,
    ToastComponent,
    TermsModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule, // ✅ Ensure this is imported
    HttpClientModule,
    NgbToastModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [],
  exports: [ToastComponent]
})
export class AppModule { }
