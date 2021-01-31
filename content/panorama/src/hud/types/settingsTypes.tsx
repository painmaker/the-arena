export const SET_SETTINGS_VISIBLE = 'SET_SETTINGS_VISIBLE'

interface SetSettingsVisibleAction {
  type: typeof SET_SETTINGS_VISIBLE
  payload: boolean
}

export type SettingsActionTypes = SetSettingsVisibleAction;