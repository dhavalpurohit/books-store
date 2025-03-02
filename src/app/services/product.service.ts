import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { config, apiEndpoint, LOCAL_STORAGE } from "../config";
import { AuthService } from "./auth.service"; // Import AuthService

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private baseUrl = config.APIBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get Offers with Authorization Token
  getOffers(): Observable<any> {
    const token = localStorage.getItem(LOCAL_STORAGE.userToken); // Get token
    const headers = new HttpHeaders({
      Authorization: `${token}`, // Attach token in header
    });

    return this.http.get(`${this.baseUrl}/${apiEndpoint.OFFER_GET_ALL}`, {
      headers,
    });
  }
}
