import { toast } from 'react-toastify';

export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
  toast(message, { type: type });
};
