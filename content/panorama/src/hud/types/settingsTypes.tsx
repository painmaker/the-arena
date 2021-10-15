export const SET_SETTINGS_VISIBLE = 'SET_SETTINGS_VISIBLE'
export const SET_CAMERA_LOCKED = 'SET_CAMERA_LOCKED'
export const SET_CAMERA_ZOOM = 'SET_CAMERA_ZOOM'
export const SET_USE_CUSTOM_UI = 'SET_USE_CUSTOM_UI'

export interface SetSettingsVisibleAction {
  type: typeof SET_SETTINGS_VISIBLE
  payload: { visible: boolean }
}

export interface SetCameraLockedAction {
  type: typeof SET_CAMERA_LOCKED
  payload: boolean
}

export interface SetCameraZoomAction {
  type: typeof SET_CAMERA_ZOOM
  payload: number
}

export interface SetUseCustomUIAction {
  type: typeof SET_USE_CUSTOM_UI
  payload: { useCustomUI: boolean }
}

export type SettingsActionTypes = SetSettingsVisibleAction | SetCameraLockedAction | SetCameraZoomAction | SetUseCustomUIAction;