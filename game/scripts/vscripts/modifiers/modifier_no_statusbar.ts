import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_no_statusbar extends BaseModifier {

  IsHidden(): boolean {
    return true;
  }

  IsPurgable(): boolean {
    return false;
  }

  IsPermanent(): boolean {
    return true;
  }

  CheckState(): Partial<Record<modifierstate, boolean>> {
    return {
      [modifierstate.MODIFIER_STATE_NO_HEALTH_BAR]: true,
    };
  }

}
