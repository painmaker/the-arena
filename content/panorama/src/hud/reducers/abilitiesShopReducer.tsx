import { AbilitiesShopTypes, SET_ABILITIES_SHOP_VISIBLE } from "../types/abilitiesShopTypes";

const initialState = {
  visible: false,
};

export default function (state = initialState, action: AbilitiesShopTypes) {
  switch (action.type) {
    case SET_ABILITIES_SHOP_VISIBLE: {
      return {
        ...state,
        visible: action.payload.visible
      };
    }
    default:
      return state;
  }
}
