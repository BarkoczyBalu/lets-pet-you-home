export interface Toast {
  content: string;
  type?: ToastType;
  delay?: number;
}

export type ToastType = 'achievement' | 'success' | 'warning' | 'error'