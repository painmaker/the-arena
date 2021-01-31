import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_not_on_minimap extends BaseModifier {

    CheckState(): Partial<Record<modifierstate, boolean>> {
        return {
            [modifierstate.MODIFIER_STATE_NOT_ON_MINIMAP]: true,
        };
    }
    
}
