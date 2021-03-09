import { HeroSelectionActionTypes, RESET_FOCUSED_HERO, FocusedHero, SET_FOCUS_HERO, SET_HERO_SELECTION_VISIBLE } from "../types/heroSelectionTypes";

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

export function setHeroSelectionVisible(visible: boolean): HeroSelectionActionTypes {
  return {
    type: SET_HERO_SELECTION_VISIBLE,
    payload: { visible }
  }
}