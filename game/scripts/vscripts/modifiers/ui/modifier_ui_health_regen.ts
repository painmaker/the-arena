import { registerModifier } from "../../lib/dota_ts_adapter";
import { modifier_ui } from "./modifier_ui";

@registerModifier()
export class modifier_ui_health_regen extends modifier_ui {

  OnCreated(): void {
    if (IsServer()) {
      this.StartIntervalThink(0.25);
    }
  }

  OnIntervalThink(): void {
    const healthRegen = Math.round(this.GetParent().GetHealthRegen() * 100);
    this.SetStackCount(Math.max(0, healthRegen));
  }

}
