

import { takeLatest } from 'redux-saga/effects'
import { SetCameraLockedAction, SetCameraZoomAction, SET_CAMERA_LOCKED, SET_CAMERA_ZOOM } from '../types/settingsTypes';

function* lockCamera({ payload: locked }: SetCameraLockedAction) {
  if (locked) {
    GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
  } else {
    GameUI.SetCameraTarget(-1 as EntityIndex);
  }
}

function* zoomCamera({ payload: zoom }: SetCameraZoomAction) {
  $.Msg("zoom: " + zoom);
  GameUI.SetCameraDistance(zoom);
}


function* settingsSaga() {
  yield takeLatest(SET_CAMERA_LOCKED, lockCamera);
  yield takeLatest(SET_CAMERA_ZOOM, zoomCamera);
}

export default settingsSaga;