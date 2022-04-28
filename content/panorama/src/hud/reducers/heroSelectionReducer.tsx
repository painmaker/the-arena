import { HeroSelectionActionTypes, RESET_FOCUSED_HERO, FocusedHero, SET_FOCUS_HERO, SET_HERO_SELECTION_VISIBLE, SET_RANDOM_HERO_DIALOG_VISIBLE } from "../interfaces/heroSelectionTypes";

interface HeroSelectionState {
  focusedHero: FocusedHero | undefined,
  randomHeroDialogVisible: boolean,
}

const initialState: HeroSelectionState = {
  focusedHero: undefined,
  randomHeroDialogVisible: false,
};

export default function (state = initialState, action: HeroSelectionActionTypes): HeroSelectionState {
  switch (action.type) {
    case SET_FOCUS_HERO: {
      return {
        ...state,
        focusedHero: action.payload.hero,
      };
    }
    case RESET_FOCUSED_HERO: {
      return {
        ...state,
        focusedHero: undefined
      };
    }
    case SET_RANDOM_HERO_DIALOG_VISIBLE: {
      return {
        ...state,
        randomHeroDialogVisible: action.payload.visible
      };
    }
    default:
      return state;
  }
}
