// Import modules
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config } from "../config";
import { AuthService } from "./auth.service";

@Injectable()
export class APIService {

  private headerOptions: any;

  constructor(public http: HttpClient, public authService: AuthService) {
  }

  httpGetRequest(apiEndpoint: any, authToken: any = "") {
    return new Promise((resolve, reject) => {

      if (!authToken)
        authToken = this.authService.getToken();

      this.headerOptions = {
        headers: new HttpHeaders().set("Authorization", authToken ? authToken : config.publicAuthToken)
      }

      this.http.get(config.APIBaseUrl + apiEndpoint, this.headerOptions).subscribe((res: any) => {
        return resolve(res);
      }, (error: any) => {
        if (error?.status === 401 || error?.statusText === "Unauthorized") {
          this.authService.logout();
          return reject(error.statusText);
        }

        return reject(error);
      })
    });
  }

  httpPostRequest(apiEndpoint: any, bodyData: any = {}, authToken: any = "") {
    return new Promise((resolve, reject) => {

      if (!authToken)
        authToken = this.authService.getToken();

      this.headerOptions = {
        headers: new HttpHeaders().set("Authorization", authToken ? authToken : config.publicAuthToken)
      }

      this.http.post(config.APIBaseUrl + apiEndpoint, bodyData, this.headerOptions).subscribe((res: any) => {
        return resolve(res);
      }, (error: any) => {
        if (error?.status === 401 || error?.statusText === "Unauthorized") {
          this.authService.logout();
          return reject(error.statusText);
        }

        return reject(error);
      })
    });
  }
}