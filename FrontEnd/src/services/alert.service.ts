import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() { }
  success(message: string, title: string = 'Success'): Promise<void> {
    return Swal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonColor: '#198754',
      timer: 1000,
    }).then(() => {
      return;
    });
  }
  error(message: string, title: string = 'Error') {
    return Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonColor: '#dc3545',
      timer: 1000,
    });
  }
  confirm(message: string, title: string = 'Are you sure?') {
    return Swal.fire({
      icon: 'question',
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
    });
  }
  showLoading(title: string = 'Loading...', message: string = 'Please wait') {
    Swal.fire({
      title,
      text: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  close() {
    Swal.close();
  }
}
