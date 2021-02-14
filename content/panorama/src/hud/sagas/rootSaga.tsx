import { fork } from 'redux-saga/effects';
import characterPanelSaga from './characterPanelSaga';
import settingsSaga from './settingsSaga';

export const rootSaga = function* root() {
  yield fork(settingsSaga);
  yield fork(characterPanelSaga);
};