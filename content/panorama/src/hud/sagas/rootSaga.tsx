import { fork } from 'redux-saga/effects';
import characterSaga from './characterSaga';
import settingsSaga from './settingsSaga';
import itemOptionsSaga from './itemOptionsSaga';
import shopSaga from './shopSaga';
import heroSelectionSaga from './heroSelectionSaga';

export const rootSaga = function* root() {
  yield fork(settingsSaga);
  yield fork(characterSaga);
  yield fork(itemOptionsSaga);
  yield fork(shopSaga);
  yield fork(heroSelectionSaga);
};