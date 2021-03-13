export const SET_FOCUS_HERO = 'SET_FOCUS_HERO'
export const RESET_FOCUSED_HERO = 'RESET_FOCUSED_HERO'
export const SET_HERO_SELECTION_VISIBLE = 'SET_HERO_SELECTION_VISIBLE'

export interface SetFocusedHero {
  type: typeof SET_FOCUS_HERO
  payload: { hero: FocusedHero }
}

export interface ResetFocusedHero {
  type: typeof RESET_FOCUSED_HERO
}

export interface SerHeroSelectionVisible {
  type: typeof SET_HERO_SELECTION_VISIBLE
  payload: { visible: boolean }
}

export type HeroSelectionActionTypes = SetFocusedHero | ResetFocusedHero | SerHeroSelectionVisible;

export interface FocusedHero {
  heroname: string,
  camera: string,
  sound: string,
  lore: string,
  attribute: string,
  abilities: string[],
  health: number,
  healthRegen: number,
  mana: number,
  manaRegen: number,
}

export interface SelectedHero {
  heroname: string,
}