import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TrainingService } from './taining.service';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  onGoingTraining$: Observable<boolean> | undefined;
  constructor(private trainingService: TrainingService, private store: Store) {}

  ngOnInit(): void {
    this.onGoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }
}
