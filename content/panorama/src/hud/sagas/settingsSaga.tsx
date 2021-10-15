

import { put, takeLatest } from 'redux-saga/effects'
import { SET_ABILITIES_SHOP_VISIBLE } from '../types/abilitiesShopTypes';
import { SET_CHARACTER_VISIBLE } from '../types/characterTypes';
import { SetSettingsVisibleAction, SET_SETTINGS_VISIBLE } from '../types/settingsTypes';
import { SET_SHOP_VISIBLE } from '../types/shopTypes';

function* settingsVisible({ payload }: SetSettingsVisibleAction) {
  if (payload.visible === true) {
    yield put({ type: SET_CHARACTER_VISIBLE, payload: { visible: false } });
    yield put({ type: SET_SHOP_VISIBLE, payload: { visible: false } });
    yield put({ type: SET_ABILITIES_SHOP_VISIBLE, payload: { visible: false } });
  }
}

function* settingsSaga() {
  yield takeLatest(SET_SETTINGS_VISIBLE, settingsVisible);
}

export default settingsSaga;