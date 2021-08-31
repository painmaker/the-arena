

import { put, takeLatest } from 'redux-saga/effects'
import { SET_CHARACTER_VISIBLE } from '../types/characterTypes';
import { SET_ITEM_OPTIONS_VISIBLE } from '../types/itemOptionsTypes';
import { SET_SETTINGS_VISIBLE } from '../types/settingsTypes';
import { SetShopVisibleAction, SET_SHOP_VISIBLE } from '../types/shopTypes';

function* shopVisible({ payload }: SetShopVisibleAction) {
  if (payload.visible === true) {
    yield put({ type: SET_SETTINGS_VISIBLE, visible: false });
    // yield put({ type: SET_ITEM_OPTIONS_VISIBLE, payload: { visible: false } });
    yield put({ type: SET_CHARACTER_VISIBLE, payload: { visible: false } });
  }
}

function* shopSaga() {
  yield takeLatest(SET_SHOP_VISIBLE, shopVisible);
}

export default shopSaga;