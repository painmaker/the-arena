

import { put, takeLatest } from 'redux-saga/effects'
import { SET_CHARACTER_PANEL_VISIBLE } from '../types/characterPanelTypes';
import { SET_ITEM_OPTIONS_VISIBLE } from '../types/itemOptionsTypes';
import { SetCameraLockedAction, SetCameraZoomAction, SetSettingsVisibleAction, SET_CAMERA_LOCKED, SET_CAMERA_ZOOM, SET_SETTINGS_VISIBLE } from '../types/settingsTypes';

function* lockCamera({ payload: locked }: SetCameraLockedAction) {
  if (locked) {
    GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
  } else {
    GameUI.SetCameraTarget(-1 as EntityIndex);
  }
}

function* zoomCamera({ payload: zoom }: SetCameraZoomAction) {
  GameUI.SetCameraDistance(zoom);
}

function* settingsVisible({ payload: visible }: SetSettingsVisibleAction) {
  if (visible === true) {
    yield put({ type: SET_CHARACTER_PANEL_VISIBLE, visible: false });
    yield put({ type: SET_ITEM_OPTIONS_VISIBLE, payload: { visible: false } });
  }
}

function* settingsSaga() {
  yield takeLatest(SET_CAMERA_LOCKED, lockCamera);
  yield takeLatest(SET_CAMERA_ZOOM, zoomCamera);
  yield takeLatest(SET_SETTINGS_VISIBLE, settingsVisible);
}

export default settingsSaga;