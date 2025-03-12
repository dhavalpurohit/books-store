import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  show(message: string, classname: string = 'bg-info text-light', delay: number = 5000) {
    this.toasts.push({ message, classname, delay });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  success(message: string) {
    this.show(message, 'bg-success text-light');
  }

  error(message: string) {
    this.show(message, 'bg-danger text-light');
  }

  warning(message: string) {
    this.show(message, 'bg-warning text-dark');
  }
}
