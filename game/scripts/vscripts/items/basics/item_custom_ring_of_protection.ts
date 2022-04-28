import { BaseAbility, registerAbility } from "../../lib/dota_ts_adapter"

LinkLuaModifier("item_custom_ring_of_protection_modifier", "modifiers/items/basics/item_custom_ring_of_protection_modifier", LuaModifierType.LUA_MODIFIER_MOTION_NONE)

@registerAbility()
export class item_custom_ring_of_protection extends BaseAbility {

  GetIntrinsicModifierName(): string {
    return "item_custom_ring_of_protection_modifier"
  }

}
