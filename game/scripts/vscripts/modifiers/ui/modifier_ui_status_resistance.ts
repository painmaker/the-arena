import { registerModifier } from "../../lib/dota_ts_adapter";
import { modifier_ui } from "./modifier_ui";

@registerModifier()
export class modifier_ui_status_resistance extends modifier_ui {

  OnCreated(): void {
    if (IsServer()) {
      this.StartIntervalThink(0.25);
    }
  }

  OnIntervalThink(): void {
    const statusResistance = Math.round(this.GetParent().GetStatusResistance() * 10000);
    this.SetStackCount(Math.max(0, statusResistance));
  }

}
