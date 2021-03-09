import { HeroSelectionActionTypes, RESET_FOCUSED_HERO, FocusedHero, SET_FOCUS_HERO, SET_HERO_SELECTION_VISIBLE } from "../types/heroSelectionTypes";

interface HeroSelectionState {
  visible: boolean,
  hero: FocusedHero | undefined,
}

const initialState: HeroSelectionState = {
  visible: true,
  hero: undefined,
};

export default function (state = initialState, action: HeroSelectionActionTypes): HeroSelectionState {
  switch (action.type) {
    case SET_FOCUS_HERO: {
      return {
        ...state,
        hero: action.payload.hero,
      };
    }
    case RESET_FOCUSED_HERO: {
      return {
        ...state,
        hero: undefined
      };
    }
    case SET_HERO_SELECTION_VISIBLE: {
      return {
        ...state,
        visible: action.payload.visible
      };
    }
    default:
      return state;
  }
}
