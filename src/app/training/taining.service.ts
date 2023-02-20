import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Excercise } from './excercise.model';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExcercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray: any) => {
            return docArray.map((doc: any) => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                duration: doc.payload.doc.data().duration,
                calories: doc.payload.doc.data().calories,
              };
            });
          })
        )
        .subscribe(
          (result: Excercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTraining(result));
          },
          () => {
            this.store.dispatch(new UI.StopLoading());
          }
        )
    );
  }

  startTraining(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex: any) => {
        this.addToDatabase({
          ...ex,
          date: Date.now(),
          state: 'completed',
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex: any) => {
        this.addToDatabase({
          ...ex,
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100),
          date: Date.now(),
          state: 'cancelled',
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: any) => {
          this.store.dispatch(new Training.SetFinishedTraining(exercises));
        })
    );
  }

  private addToDatabase(exercise: Excercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

  cancelSubscription() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }
}
