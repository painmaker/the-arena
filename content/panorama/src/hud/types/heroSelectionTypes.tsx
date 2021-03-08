export const SET_SELECTED_HERO = 'SET_SELECTED_HERO'
export const RESET_SELECTED_HERO = 'RESET_SELECTED_HERO'

export interface SetSelectedHero {
  type: typeof SET_SELECTED_HERO
  payload: { hero: SelectedHero }
}

export interface ResetSelectedHero {
  type: typeof RESET_SELECTED_HERO
}

export type HeroSelectionActionTypes = SetSelectedHero | ResetSelectedHero;

export interface SelectedHero {
  name: string,
  camera: string,
  sounds: string[],
  lore: string,
}