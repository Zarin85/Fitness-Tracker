import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from './../taining.service';
import { Excercise } from './../excercise.model';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  excercise$: Observable<Excercise[]> | undefined;
  isLoading$: Observable<boolean> | undefined;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getISLoading);

    this.excercise$ = this.store.select(fromTraining.getAvailableTraining);
    this.fetchExcercises();
  }

  fetchExcercises() {
    this.trainingService.fetchAvailableExcercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startTraining(f.value.excercise);
  }
}
