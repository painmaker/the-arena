

import { put, takeLatest } from 'redux-saga/effects'
import { SET_CHARACTER_PANEL_VISIBLE } from '../types/characterPanelTypes';
import { SetItemOptionsVisible, SET_ITEM_OPTIONS_VISIBLE } from '../types/itemOptionsTypes';
import { SET_SETTINGS_VISIBLE } from '../types/settingsTypes';

function* itemOptionsVisible({ payload }: SetItemOptionsVisible) {
  if (payload.visible === true) {
    yield put({ type: SET_CHARACTER_PANEL_VISIBLE, visible: false });
    yield put({ type: SET_SETTINGS_VISIBLE, visible: false });
  }
}

function* itemOptionsSaga() {
  yield takeLatest(SET_ITEM_OPTIONS_VISIBLE, itemOptionsVisible);
}

export default itemOptionsSaga;