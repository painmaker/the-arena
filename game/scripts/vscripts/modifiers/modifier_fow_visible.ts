import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_fow_visible extends BaseModifier {

  CheckState(): Partial<Record<modifierstate, boolean>> {
    return {
      // [modifierstate.MODIFIER_STATE_PROVIDES_VISION]: true,
    };
  }

  IsHidden(): boolean {
    return true;
  }

  IsPurgable(): boolean {
    return false;
  }


  DeclareFunctions(): modifierfunction[] {
    return [modifierfunction.MODIFIER_PROPERTY_PROVIDES_FOW_POSITION];
  }

  GetModifierProvidesFOWVision(): 0 | 1 {
    return 1;
  }

}
