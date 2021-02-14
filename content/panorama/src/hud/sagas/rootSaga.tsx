import { all, fork } from 'redux-saga/effects';
import settingsSaga from './settingsSaga';

export const rootSaga = function* root() {
  yield fork(settingsSaga)
};