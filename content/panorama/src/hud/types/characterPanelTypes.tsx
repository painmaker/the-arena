export const SET_CHARACTER_PANEL_VISIBLE = 'SET_CHARACTER_PANEL_VISIBLE'

export interface SetCharacterPanelVisibleAction {
  type: typeof SET_CHARACTER_PANEL_VISIBLE
  payload: boolean
}

export type CharacterPanelActionTypes = SetCharacterPanelVisibleAction;