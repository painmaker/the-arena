import { SET_SHOP_SEARCH_VALUE, SET_SHOP_VISIBLE, ShopActionTypes } from "../types/itemsShopTypes";

const initialState = {
  visible: false,
  searchValue: '',
};

export default function (state = initialState, action: ShopActionTypes) {
  switch (action.type) {
    case SET_SHOP_VISIBLE: {
      return {
        ...state,
        visible: action.payload.visible
      };
    }
    case SET_SHOP_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.payload.searchValue
      };
    }
    default:
      return state;
  }
}
