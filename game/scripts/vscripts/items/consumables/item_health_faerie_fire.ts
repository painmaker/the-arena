import { registerAbility, BaseItem } from "../../lib/dota_ts_adapter";

@registerAbility()
export class item_health_faerie_fire extends BaseItem {


  OnSpellStart(): void {

    const caster = this.GetCaster();
    const healthRestored = this.GetSpecialValueFor("health_restored")

    caster.EmitSoundParams("DOTA_Item.FaerieSpark.Activate", 0, 0.5, 0)
    caster.Heal(healthRestored, this);

    const fxIndex = ParticleManager.CreateParticle("particles/items3_fx/fish_bones_active.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, caster)
    ParticleManager.ReleaseParticleIndex(fxIndex)

    const charges = this.GetCurrentCharges();
    if (charges > 1) {
      this.SpendCharge();
    } else {
      this.Destroy();
    }


  }

}


