import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";

@registerAbility()
export class dazzle_depraved_healing extends BaseAbility {

  OnSpellStart(): void {
    print("Spell Started")
  }

  GetCastRange(location: Vector, target: CDOTA_BaseNPC | undefined): number {
    return this.GetSpecialValueFor("cast_range") + this.GetCaster().GetCastRangeBonus();
  }

}


