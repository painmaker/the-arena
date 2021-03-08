

import { put, takeLatest } from 'redux-saga/effects'
import { SET_CHARACTER_VISIBLE } from '../types/characterTypes';
import { SET_ITEM_OPTIONS_VISIBLE } from '../types/itemOptionsTypes';
import { SetCameraLockedAction, SetCameraZoomAction, SetSettingsVisibleAction, SetUseCustomUIAction, SET_CAMERA_LOCKED, SET_CAMERA_ZOOM, SET_SETTINGS_VISIBLE, SET_USE_CUSTOM_UI } from '../types/settingsTypes';
import { SET_SHOP_VISIBLE } from '../types/shopTypes';

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
    yield put({ type: SET_CHARACTER_VISIBLE, payload: { visible: false } });
    yield put({ type: SET_ITEM_OPTIONS_VISIBLE, payload: { visible: false } });
    yield put({ type: SET_SHOP_VISIBLE, payload: { visible: false } });
  }
}

function* useCustomUI({ payload }: SetUseCustomUIAction) {
  // if (payload.useCustomUI === false) {
  //   yield put({ type: SET_CAMERA_LOCKED, payload: false })
  //   yield put({ type: SET_CAMERA_ZOOM, payload: 1164 })
  // } else { 
  //   yield put({ type: SET_CAMERA_LOCKED, payload: true })
  //   yield put({ type: SET_CAMERA_ZOOM, payload: 1600 })
  // }
}

function* settingsSaga() {
  yield takeLatest(SET_CAMERA_LOCKED, lockCamera);
  yield takeLatest(SET_CAMERA_ZOOM, zoomCamera);
  yield takeLatest(SET_SETTINGS_VISIBLE, settingsVisible);
  yield takeLatest(SET_USE_CUSTOM_UI, useCustomUI);
}

export default settingsSaga;