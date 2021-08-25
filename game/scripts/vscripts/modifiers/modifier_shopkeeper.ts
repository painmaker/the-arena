import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_shopkeeper extends BaseModifier {

  CheckState(): Partial<Record<modifierstate, boolean>> {
    return {
      [modifierstate.MODIFIER_STATE_NO_HEALTH_BAR]: true,
      [modifierstate.MODIFIER_STATE_INVULNERABLE]: true,
    };
  }

}
