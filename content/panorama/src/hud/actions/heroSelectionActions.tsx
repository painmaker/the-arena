import { HeroSelectionActionTypes, RESET_SELECTED_HERO, SelectedHero, SET_SELECTED_HERO } from "../types/heroSelectionTypes";

export function setSelectedHero(hero: SelectedHero): HeroSelectionActionTypes {
  return {
    type: SET_SELECTED_HERO,
    payload: { hero }
  }
}

export function resetSelectedHero(): HeroSelectionActionTypes {
  return {
    type: RESET_SELECTED_HERO,
  }
}