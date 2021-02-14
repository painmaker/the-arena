export const SET_SETTINGS_VISIBLE = 'SET_SETTINGS_VISIBLE'
export const SET_CAMERA_LOCKED = 'SET_CAMERA_LOCKED'
export const SET_CAMERA_ZOOM = 'SET_CAMERA_ZOOM'

export interface SetSettingsVisibleAction {
  type: typeof SET_SETTINGS_VISIBLE
  payload: boolean
}

export interface SetCameraLockedAction {
  type: typeof SET_CAMERA_LOCKED
  payload: boolean
}

export interface SetCameraZoomAction {
  type: typeof SET_CAMERA_ZOOM
  payload: number
}


export type SettingsActionTypes = SetSettingsVisibleAction | SetCameraLockedAction | SetCameraZoomAction;