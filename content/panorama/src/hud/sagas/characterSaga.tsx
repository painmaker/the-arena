

import { put, takeLatest } from 'redux-saga/effects'
import { SET_ABILITIES_SHOP_VISIBLE } from '../types/abilitiesShopTypes';
import { SetCharacterVisibleAction, SET_CHARACTER_VISIBLE } from '../types/characterTypes';
import { SET_SETTINGS_VISIBLE } from '../types/settingsTypes';
import { SET_SHOP_VISIBLE } from '../types/itemsShopTypes';

function* characterVisible({ payload }: SetCharacterVisibleAction) {
  if (payload.visible === true) {
    yield put({ type: SET_SETTINGS_VISIBLE, payload: { visible: false } });
    yield put({ type: SET_SHOP_VISIBLE, payload: { visible: false } });
    yield put({ type: SET_ABILITIES_SHOP_VISIBLE, payload: { visible: false } });
  }
}

function* characterSaga() {
  yield takeLatest(SET_CHARACTER_VISIBLE, characterVisible);
}

export default characterSaga;