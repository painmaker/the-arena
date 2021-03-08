export const SET_CHARACTER_VISIBLE = 'SET_CHARACTER_VISIBLE'

export interface SetCharacterVisibleAction {
  type: typeof SET_CHARACTER_VISIBLE
  payload: { visible: boolean }
}

export type CharacterActionTypes = SetCharacterVisibleAction; 