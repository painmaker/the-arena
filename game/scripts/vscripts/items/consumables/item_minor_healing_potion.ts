import { registerAbility, BaseAbility } from "../../lib/dota_ts_adapter";

@registerAbility()
export class item_minor_healing_potion extends BaseAbility {


  OnSpellStart(): void {

    print("Healed")

  }

}


