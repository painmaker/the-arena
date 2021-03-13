

import { put, takeLatest } from 'redux-saga/effects'
import { SetCharacterVisibleAction, SET_CHARACTER_VISIBLE } from '../types/characterTypes';
import { SET_ITEM_OPTIONS_VISIBLE } from '../types/itemOptionsTypes';
import { SET_SETTINGS_VISIBLE } from '../types/settingsTypes';
import { SET_SHOP_VISIBLE } from '../types/shopTypes';

function* characterVisible({ payload }: SetCharacterVisibleAction) {
  if (payload.visible === true) {
    yield put({ type: SET_SETTINGS_VISIBLE, visible: false });
    yield put({ type: SET_ITEM_OPTIONS_VISIBLE, payload: { visible: false } });
    yield put({ type: SET_SHOP_VISIBLE, payload: { visible: false } });
  }
}

function* characterSaga() {
  yield takeLatest(SET_CHARACTER_VISIBLE, characterVisible);
}

export default characterSaga;