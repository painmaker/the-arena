

import { put, takeLatest } from 'redux-saga/effects'
import { SET_ABILITIES_SHOP_VISIBLE } from '../types/abilitiesShopTypes';
import { SET_CHARACTER_VISIBLE } from '../types/characterTypes';
import { SET_SETTINGS_VISIBLE } from '../types/settingsTypes';
import { SetShopVisibleAction, SET_SHOP_VISIBLE } from '../types/shopTypes';

function* shopVisible({ payload }: SetShopVisibleAction) {
  if (payload.visible === true) {
    yield put({ type: SET_SETTINGS_VISIBLE, payload: { visible: false } });
    yield put({ type: SET_CHARACTER_VISIBLE, payload: { visible: false } });
    yield put({ type: SET_ABILITIES_SHOP_VISIBLE, payload: { visible: false } });
  }
}

function* shopSaga() {
  yield takeLatest(SET_SHOP_VISIBLE, shopVisible);
}

export default shopSaga;