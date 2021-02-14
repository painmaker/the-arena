import { registerModifier } from "../../lib/dota_ts_adapter";
import { modifier_ui } from "./modifier_ui";

@registerModifier()
export class modifier_ui_spell_amp extends modifier_ui {

  OnCreated(): void {
    if (IsServer()) {
      this.StartIntervalThink(0.25);
    }
  }

  OnIntervalThink(): void {
    const spellAmp = Math.round(this.GetParent().GetSpellAmplification(false) * 10000);
    this.SetStackCount(Math.max(0, spellAmp));
  }

}
