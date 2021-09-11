import { AbilitiesShopTypes, SET_ABILITIES_SHOP_VISIBLE } from "../types/abilitiesShopTypes";

export function setAbilitiesShopVisible(visible: boolean): AbilitiesShopTypes {
  return {
    type: SET_ABILITIES_SHOP_VISIBLE,
    payload: { visible }
  }
}