import { HeroSelectionActionTypes, RESET_FOCUSED_HERO, FocusedHero, SET_FOCUS_HERO, SET_HERO_SELECTION_VISIBLE, SET_RANDOM_HERO_DIALOG_VISIBLE } from "../types/heroSelectionTypes";

export function setFocusedHero(hero: FocusedHero): HeroSelectionActionTypes {
  return {
    type: SET_FOCUS_HERO,
    payload: { hero }
  }
}

export function resetFocusedHero(): HeroSelectionActionTypes {
  return {
    type: RESET_FOCUSED_HERO,
  }
}

export function setRandomHeroDialogVisible(visible: boolean): HeroSelectionActionTypes {
  return {
    type: SET_RANDOM_HERO_DIALOG_VISIBLE,
    payload: { visible }
  }
}