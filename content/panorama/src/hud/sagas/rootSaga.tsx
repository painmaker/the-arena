import { fork } from 'redux-saga/effects';
import heroSelectionSaga from './heroSelectionSaga';

export const rootSaga = function* root() {
  yield fork(heroSelectionSaga);
};