export const SET_SHOP_VISIBLE = 'SET_SHOP_VISIBLE'
export const SET_SHOP_SEARCH_VALUE = 'SET_SHOP_SEARCH_VALUE'

export interface SetShopVisibleAction {
  type: typeof SET_SHOP_VISIBLE
  payload: { visible: boolean }
}

export interface SetShopSearchValueAction {
  type: typeof SET_SHOP_SEARCH_VALUE
  payload: { searchValue: string }
}

export type ShopActionTypes = SetShopVisibleAction | SetShopSearchValueAction;


export interface Item {
  itemname: string,
  cost: number,
  aliases: string[],
}