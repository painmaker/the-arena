import { HeroSelectionActionTypes, RESET_SELECTED_HERO, SelectedHero, SET_SELECTED_HERO } from "../types/heroSelectionTypes";

interface HeroSelectionState {
  hero: SelectedHero | undefined,
}

const initialState: HeroSelectionState = {
  hero: undefined,
};

export default function (state = initialState, action: HeroSelectionActionTypes): HeroSelectionState {
  switch (action.type) {
    case SET_SELECTED_HERO: {
      return {
        ...state,
        hero: action.payload.hero,
      };
    }
    case RESET_SELECTED_HERO: {
      return {
        ...state,
        hero: undefined
      };
    }
    default:
      return state;
  }
}
