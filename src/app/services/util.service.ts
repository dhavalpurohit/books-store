// Import modules
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, NOTIFICATION_TYPE } from "../config";

@Injectable()
export class UtilService {
  authToken: any;
  closeResult: any;
  toaster: any;

  constructor(public router: Router) {}

  isEmpty = (value: any) => {
    return value == undefined || value == null || value == "" ? true : false;
  };

  toastMessage(message: any, type: any = "") {
    const messageObj: any = { detail: message };
    if (type === NOTIFICATION_TYPE.SUCCESS) {
      messageObj.severity = "success";
      messageObj.summary = "Success";
    } else if (type === NOTIFICATION_TYPE.ERROR) {
      messageObj.severity = "error";
      messageObj.summary = "Error";
    }
  }

  checkAuth() {
    const authToken = this.getToken();
    if (authToken) this.router.navigate(["/user/profile"]);
  }

  logout() {
    this.removeLocalStorageData("userId");
    this.removeLocalStorageData(LOCAL_STORAGE.userToken);
    this.router.navigate(["/auth/login"]);
  }

  setToken(token: string): void {
    console.log("setToken", token);
    this.authToken = token;
    this.setLocalStorageData(LOCAL_STORAGE.userToken, token);
  }

  getToken(): string | null {
    if (this.authToken) return this.authToken;
    else return this.getLocalStorageData(LOCAL_STORAGE.userToken, "string");
  }

  setLocalStorageData(itemName: any, itemValue: any) {
    if (itemValue != "" || itemValue != null)
      localStorage.setItem(itemName, itemValue);
  }

  getLocalStorageData(itemName: any, dataType: any): string | null {
    let itemValue: any = null;
    itemValue = localStorage.getItem(itemName)
      ? localStorage.getItem(itemName)
      : null;
    if (dataType === "json") itemValue = JSON.parse(itemValue);

    return itemValue != "" ? itemValue : null;
  }

  removeLocalStorageData(itemName: any) {
    localStorage.removeItem(itemName);
    delete this.authToken;
  }

  downloadFile(data: any, filename = "company_details", fileType = "json") {
    let blob;
    if (fileType === ".csv") {
      const headers = Object.keys(data[0]);
      const csv = data.map((row: any) =>
        headers
          .map((fieldName) => {
            let field = row[fieldName];
            if (field && typeof field === "string")
              field = field.replace("/,/g", "").replace(/,/g, "");

            return field;
          })
          .join(",")
      );
      const header = headers.join(",");
      csv.unshift(header);
      const csvData = "\ufeff" + csv.join("\r\n");
      blob = new Blob([csvData], { type: "text/csv;charset=UTF-8" });
    } else {
      blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json;charset=utf-8;",
      });
    }

    const downloadLink = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const isSafariBrowser =
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") === -1;
    if (isSafariBrowser) downloadLink.setAttribute("target", "_blank");

    downloadLink.setAttribute("href", url);
    downloadLink.setAttribute("download", filename + fileType);
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
