import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // NOTIFICATION
  showNotification(
    msg: string,
    btnTxt?: string
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(msg, btnTxt, {
      duration: 4000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  constructor(private snackBar: MatSnackBar) {}
}
