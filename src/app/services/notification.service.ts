import { Injectable } from '@angular/core';
import { Toast, ToastType } from 'src/interfaces/toast.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  toasts: Toast[] = [];

  show(content: string, type: ToastType = 'success') {
    if (this.toasts.length) {
      setTimeout(() => {
        this.toasts.push({ content, type });
      }, 5000);
    } else {
      this.toasts.push({ content, type });
    }
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}