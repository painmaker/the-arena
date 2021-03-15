export const SET_FOCUS_HERO = 'SET_FOCUS_HERO'
export const RESET_FOCUSED_HERO = 'RESET_FOCUSED_HERO'
export const SET_HERO_SELECTION_VISIBLE = 'SET_HERO_SELECTION_VISIBLE'
export const SET_RANDOM_HERO_DIALOG_VISIBLE = 'SET_RANDOM_HERO_DIALOG_VISIBLE'

export interface SetFocusedHero {
  type: typeof SET_FOCUS_HERO
  payload: { hero: FocusedHero }
}

export interface ResetFocusedHero {
  type: typeof RESET_FOCUSED_HERO
}

export interface SetHeroSelectionVisible {
  type: typeof SET_HERO_SELECTION_VISIBLE
  payload: { visible: boolean }
}

export interface SetRandomHeroDialogVisible {
  type: typeof SET_RANDOM_HERO_DIALOG_VISIBLE
  payload: { visible: boolean }
}

export type HeroSelectionActionTypes = SetFocusedHero | ResetFocusedHero | SetHeroSelectionVisible | SetRandomHeroDialogVisible;

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
  damage: number,
  armor: number,
  movespeed: number,
  attackRange: number,
  attackSpeed: number,
  attackRate: number,
  agility: number,
  agilityGain: number,
  strength: number,
  strengthGain: number,
  intelligence: number,
  intelligenceGain: number,
}

export interface SelectedHero {
  heroname: string,
}