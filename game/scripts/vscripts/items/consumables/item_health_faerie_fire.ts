import { registerAbility, BaseItem } from "../../lib/dota_ts_adapter";

@registerAbility()
export class item_health_faerie_fire extends BaseItem {


  OnSpellStart(): void {

    const caster = this.GetCaster();
    const healthRestored = this.GetSpecialValueFor("health_restored");

    const healthDelta = Math.min(healthRestored, caster.GetMaxHealth() - caster.GetHealth());

    caster.EmitSoundParams("DOTA_Item.FaerieSpark.Activate", 0, 0.5, 0);
    caster.Heal(healthRestored, this);

    const fxIndex = ParticleManager.CreateParticle("particles/items3_fx/fish_bones_active.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, caster);
    ParticleManager.ReleaseParticleIndex(fxIndex);

    const fxText = ParticleManager.CreateParticle("particles/general/health_and_mana_gained_text.vpcf", ParticleAttachment_t.PATTACH_POINT_FOLLOW, caster);
    ParticleManager.SetParticleControl(fxText, 1, Vector(0, healthDelta, 0));
    ParticleManager.SetParticleControl(fxText, 2, Vector(2, 2 + math.floor(math.log10(healthDelta)), 0));
    ParticleManager.SetParticleControl(fxText, 3, Vector(60, 255, 60));
    ParticleManager.ReleaseParticleIndex(fxText);

    const charges = this.GetCurrentCharges();
    if (charges > 1) {
      this.SpendCharge();
    } else {
      this.Destroy();
    }


  }

}


