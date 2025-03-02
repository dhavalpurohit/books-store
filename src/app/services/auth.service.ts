import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { config, apiEndpoint } from "../config";
import { UtilService } from "./util.service"; // Import UtilService

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = config.APIBaseUrl;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable for components

  constructor(
    private http: HttpClient,
    private utilService: UtilService, // Inject UtilService
    private router: Router
  ) {
    this.isLoggedInSubject.next(this.hasToken());
  }

  private hasToken(): boolean {
    return !!this.utilService.getToken(); // Now called after constructor
  }

  // 🔹 Register User (New Function)
  register(name: string, email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/${apiEndpoint.USER_REGISTER}`;
    const body = { name, email, password };
    return this.http.post(url, body);
  }

  // Login API Call
  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/${apiEndpoint.USER_LOGIN}`;
    const body = { email, password };
    return this.http.post(url, body);
  }

  // Handle Login Response
  handleLoginSuccess(response: any) {
    if (response.response.authToken) {
      this.utilService.setToken(response.response.authToken); // Save token using UtilService
      this.isLoggedInSubject.next(true);
      this.router.navigate(["/"]); // Redirect after login
    }
  }

  // Logout User
  logout() {
    this.utilService.logout(); // Remove token
    this.isLoggedInSubject.next(false); // Notify components that user is logged out
    this.router.navigate(["/login"]); // Redirect to login page
  }

  // Get Token
  getToken(): string | null {
    return this.utilService.getToken();
  }
}
