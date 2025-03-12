// Import modules
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config } from "../config";
import { AuthService } from "./auth.service";
import { NOTIFICATION_TYPE } from "../config";

@Injectable()
export class APIService {

  private headerOptions: any;

  constructor(public http: HttpClient, public authService: AuthService) {
  }

  toastMessage(message: any, type: any = "") {
    const messageObj: any = { detail: message };
    if (type === NOTIFICATION_TYPE.SUCCESS) {
      messageObj.severity = "success";
      messageObj.summary = "Success";
    } else if (type === NOTIFICATION_TYPE.ERROR) {
      messageObj.severity = "error";
      messageObj.summary = "Error";
    } else if (type === NOTIFICATION_TYPE.WARNING) {
      messageObj.severity = "warning";
      messageObj.summary = "Warning";
    }
  }

  httpGetRequest(apiEndpoint: any, isToast: boolean = false, authToken: any = "") {
    return new Promise((resolve, reject) => {

      if (!authToken)
        authToken = this.authService.getToken();

      this.headerOptions = {
        headers: new HttpHeaders().set("Authorization", authToken ? authToken : config.publicAuthToken)
      }

      this.http.get(config.APIBaseUrl + apiEndpoint, this.headerOptions).subscribe((res: any) => {
        if (isToast) {
          if (res.response_error)
            this.toastMessage(res.message, NOTIFICATION_TYPE.ERROR)
          else
            this.toastMessage(res.message, NOTIFICATION_TYPE.SUCCESS)
        }

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

  httpPostRequest(apiEndpoint: any, bodyData: any = {}, isToast: boolean = false, authToken: any = "") {
    return new Promise((resolve, reject) => {

      if (!authToken)
        authToken = this.authService.getToken();

      this.headerOptions = {
        headers: new HttpHeaders().set("Authorization", authToken ? authToken : config.publicAuthToken)
      }

      this.http.post(config.APIBaseUrl + apiEndpoint, bodyData, this.headerOptions).subscribe((res: any) => {
        if (isToast) {
          if (res.response_error)
            this.toastMessage(res.message, NOTIFICATION_TYPE.ERROR)
          else
            this.toastMessage(res.message, NOTIFICATION_TYPE.SUCCESS)
        }

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