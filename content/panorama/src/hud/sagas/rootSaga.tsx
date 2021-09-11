import { fork } from 'redux-saga/effects';
import characterSaga from './characterSaga';
import settingsSaga from './settingsSaga';
import shopSaga from './shopSaga';
import heroSelectionSaga from './heroSelectionSaga';
import abilitiesShopSaga from './abilitiesShopSaga';

export const rootSaga = function* root() {
  yield fork(settingsSaga);
  yield fork(characterSaga);
  yield fork(shopSaga);
  yield fork(heroSelectionSaga);
  yield fork(abilitiesShopSaga);
};