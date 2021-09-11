export const SET_ABILITIES_SHOP_VISIBLE = 'SET_ABILITIES_SHOP_VISIBLE'

export interface SetAbilitiesShopVisibleAction {
  type: typeof SET_ABILITIES_SHOP_VISIBLE
  payload: { visible: boolean }
}

export type AbilitiesShopTypes = SetAbilitiesShopVisibleAction;