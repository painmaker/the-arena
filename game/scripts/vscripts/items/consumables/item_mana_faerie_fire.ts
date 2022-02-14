import { registerAbility, BaseItem } from "../../lib/dota_ts_adapter";

@registerAbility()
export class item_mana_faerie_fire extends BaseItem {


  OnSpellStart(): void {

    const caster = this.GetCaster();
    const manaRestored = this.GetSpecialValueFor("mana_restored");

    const manahDelta = Math.min(manaRestored, caster.GetMaxMana() - caster.GetMana());

    caster.EmitSoundParams("DOTA_Item.FaerieSpark.Activate", 0, 0.5, 0);
    caster.GiveMana(manaRestored);

    const fxIndex = ParticleManager.CreateParticle("particles/items3_fx/fish_bones_active.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, caster);
    ParticleManager.ReleaseParticleIndex(fxIndex);

    const fxText = ParticleManager.CreateParticle("particles/general/health_and_mana_gained_text.vpcf", ParticleAttachment_t.PATTACH_POINT_FOLLOW, caster);
    ParticleManager.SetParticleControl(fxText, 1, Vector(0, manahDelta, 0));
    ParticleManager.SetParticleControl(fxText, 2, Vector(2, 2 + math.floor(math.log10(manahDelta)), 0));
    ParticleManager.SetParticleControl(fxText, 3, Vector(30, 160, 255));
    ParticleManager.ReleaseParticleIndex(fxText);

    const charges = this.GetCurrentCharges();
    if (charges > 1) {
      this.SpendCharge();
    } else {
      this.Destroy();
    }


  }

}


