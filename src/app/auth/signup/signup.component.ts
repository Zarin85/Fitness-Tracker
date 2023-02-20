import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from './../auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  maxDate = new Date();
  isLoading$: Observable<boolean> | undefined;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getISLoading);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  submit(form: any) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
