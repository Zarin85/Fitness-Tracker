import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { TrainingService } from './../training/taining.service';
import { UIService } from './../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable()
export class AuthService {
  constructor(
    private route: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.route.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscription();
        this.route.navigate(['/login']);
        this.store.dispatch(new Auth.SetUnAuthenticated());
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((err) => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnakeBar(
          err.message,
          undefined,
          5000,
          'center',
          'top'
        );
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((err) => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnakeBar(
          err.message,
          'Dismiss',
          undefined,
          'center',
          'top'
        );
      });
  }

  logout() {
    this.afAuth.signOut();
  }
}
