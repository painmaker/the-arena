import { registerModifier } from "../../lib/dota_ts_adapter";
import { modifier_ui } from "./modifier_ui";

@registerModifier()
export class modifier_ui_hero_id extends modifier_ui {

  OnCreated(): void {
    if (IsServer()) {
      const parent = this.GetParent();
      if (parent.IsRealHero()) {
        const heroId = (parent as CDOTA_BaseNPC_Hero).GetHeroID();
        this.SetStackCount(heroId);
      } else {
        this.Destroy();
      }
    }
  }

}
