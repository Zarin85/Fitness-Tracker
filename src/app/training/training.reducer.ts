import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Excercise } from './excercise.model';
import * as fromRoot from '../app.reducer';
import {
  TrainingActions,
  SET_AVAILABLE_TRAINING,
  SET_FINISHED_TRAINING,
  START_TRAINING,
  STOP_TRAINING,
} from './training.actions';
import { stat } from 'fs';

export interface TrainingState {
  availableTraining: Excercise[];
  finishedTraining: Excercise[];
  activeTraining?: Excercise;
}
export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableTraining: [],
  finishedTraining: [],
  activeTraining: undefined,
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAINING:
      return {
        ...state,
        availableTraining: action.payload,
      };
    case SET_FINISHED_TRAINING:
      return {
        ...state,
        finishedTraining: action.payload,
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {
          ...state.availableTraining.find((ex) => ex.id === action.payload),
        },
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: undefined,
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState =
  createFeatureSelector<TrainingState>('training');

export const getAvailableTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableTraining
);
export const getFinishedTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedTraining
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);

export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
);
