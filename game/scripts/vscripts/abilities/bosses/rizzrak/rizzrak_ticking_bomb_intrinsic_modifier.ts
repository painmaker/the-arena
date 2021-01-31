import { BaseModifier, registerModifier } from "../../../lib/dota_ts_adapter";

@registerModifier()
export class rizzrak_ticking_bomb_intrinsic_modifier extends BaseModifier {

  OnCreated() : void {
    if (IsServer()) {
      this.GetParent().SetHullRadius(0);
    }
  }

  CheckState(): Partial<Record<modifierstate, boolean>> {
    return {
      [modifierstate.MODIFIER_STATE_NO_HEALTH_BAR]: true,
      [modifierstate.MODIFIER_STATE_UNSELECTABLE]: true,
      [modifierstate.MODIFIER_STATE_INVULNERABLE]: true,
      [modifierstate.MODIFIER_STATE_NO_UNIT_COLLISION]: true,
      [modifierstate.MODIFIER_STATE_ROOTED]: true,
      [modifierstate.MODIFIER_STATE_DISARMED]: true,
      [modifierstate.MODIFIER_STATE_OUT_OF_GAME]: true,
      [modifierstate.MODIFIER_STATE_NO_TEAM_SELECT]: true,
      [modifierstate.MODIFIER_STATE_NO_TEAM_MOVE_TO]: true,
      [modifierstate.MODIFIER_STATE_COMMAND_RESTRICTED]: true,
      [modifierstate.MODIFIER_STATE_ATTACK_IMMUNE]: true,
      [modifierstate.MODIFIER_STATE_MAGIC_IMMUNE]: true,
      [modifierstate.MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY]: true,
    };
  }

}
