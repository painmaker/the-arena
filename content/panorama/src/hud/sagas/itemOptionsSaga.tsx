

import { put, takeLatest } from 'redux-saga/effects'
import { SetItemOptionsVisible, SET_ITEM_OPTIONS_VISIBLE } from '../types/itemOptionsTypes';

function* itemOptionsVisible({ payload }: SetItemOptionsVisible) {
  if (payload.visible === true) {
    // yield put({ type: SET_CHARACTER_VISIBLE, payload: { visible: false } });
    // yield put({ type: SET_SETTINGS_VISIBLE, visible: false });
    // yield put({ type: SET_SHOP_VISIBLE, payload: { visible: false } });
  }
}

function* itemOptionsSaga() {
  yield takeLatest(SET_ITEM_OPTIONS_VISIBLE, itemOptionsVisible);
}

export default itemOptionsSaga;