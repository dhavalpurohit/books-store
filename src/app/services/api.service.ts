// Import modules
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// Import environment
import { config } from "../config";
import { UtilService } from "./util.service";
// Import constants
import { NOTIFICATION_TYPE } from "../config";

@Injectable()
export class APIService {

  private headerOptions: any;

  constructor(public http: HttpClient, public utilService: UtilService) {
  }

  httpPostRequest(apiEndpoint: any, bodyData: any = {}, isToast: boolean = false, authToken: any = "") {
    return new Promise((resolve, reject) => {

      if (!authToken)
        authToken = this.utilService.getToken();

      this.headerOptions = {
        headers: new HttpHeaders().set("Authorization", authToken ? authToken : config.publicAuthToken)
      }

      this.http.post(config.APIBaseUrl + apiEndpoint, bodyData, this.headerOptions).subscribe((res: any) => {
        if (isToast) {
          if (res.response_error)
            this.utilService.toastMessage(res.message, NOTIFICATION_TYPE.ERROR)
          else
            this.utilService.toastMessage(res.message, NOTIFICATION_TYPE.SUCCESS)
        }

        return resolve(res);
      }, (error: any) => {
        if (error?.status === 401 || error?.statusText === "Unauthorized") {
          this.utilService.toastMessage("Please login to continue!", NOTIFICATION_TYPE.ERROR);
          this.utilService.logout();

          return reject(error.statusText);
        }

        return reject(error);
      })
    });
  }
}