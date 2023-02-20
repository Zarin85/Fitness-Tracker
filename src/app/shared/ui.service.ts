import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';

@Injectable()
export class UIService {
  isLoadingStateChanged = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  showSnakeBar(
    message: string,
    actions?: any,
    duration?: number,
    horizontalPosition?: any,
    verticalPosition?: any
  ) {
    this.snackBar.open(message, actions, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }
}
