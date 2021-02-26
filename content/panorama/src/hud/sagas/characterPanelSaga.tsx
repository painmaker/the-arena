

import { put, takeLatest } from 'redux-saga/effects'
import { SetCharacterPanelVisibleAction, SET_CHARACTER_PANEL_VISIBLE } from '../types/characterPanelTypes';
import { SET_ITEM_OPTIONS_VISIBLE } from '../types/itemOptionsTypes';
import { SET_SETTINGS_VISIBLE } from '../types/settingsTypes';

function* characterPanelVisible({ payload: visible }: SetCharacterPanelVisibleAction) {
  if (visible === true) {
    yield put({ type: SET_SETTINGS_VISIBLE, visible: false });
    yield put({ type: SET_ITEM_OPTIONS_VISIBLE, payload: { visible: false } });
  }
}

function* characterPanelSaga() {
  yield takeLatest(SET_CHARACTER_PANEL_VISIBLE, characterPanelVisible);
}

export default characterPanelSaga;