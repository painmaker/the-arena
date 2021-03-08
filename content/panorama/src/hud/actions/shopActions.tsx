import { SET_SHOP_SEARCH_VALUE, SET_SHOP_VISIBLE, ShopActionTypes } from "../types/shopTypes";

export function setShopVisible(visible: boolean): ShopActionTypes {
  return {
    type: SET_SHOP_VISIBLE,
    payload: { visible }
  }
}

export function setShopSearchValue(searchValue: string): ShopActionTypes {
  return {
    type: SET_SHOP_SEARCH_VALUE,
    payload: { searchValue }
  }
}