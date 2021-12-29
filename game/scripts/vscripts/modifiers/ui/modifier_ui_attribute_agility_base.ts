import { registerModifier } from "../../lib/dota_ts_adapter";
import { modifier_ui } from "./modifier_ui";

@registerModifier()
export class modifier_ui_attribute_agility_base extends modifier_ui {

  strength: number = 0;

  OnCreated(): void {
    if (IsServer() ) {
      this.StartIntervalThink(0.25);
    }
  }

  OnIntervalThink(): void {
    if (IsServer()) {
      const parent = this.GetParent();
      if (parent.IsHero()) {
        this.SetStackCount(parent.GetBaseAgility());
      }
    }
  }

}
