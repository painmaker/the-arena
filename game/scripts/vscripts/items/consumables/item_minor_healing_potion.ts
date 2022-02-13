import { registerAbility, BaseItem } from "../../lib/dota_ts_adapter";

@registerAbility()
export class item_minor_healing_potion extends BaseItem {


  OnSpellStart(): void {

    print("Healed")

    const caster = this.GetCaster();
    const healing = this.GetSpecialValueFor("healing")

    caster.EmitSoundParams("DOTA_Item.FaerieSpark.Activate", 0, 0.5, 0)
    caster.Heal(healing, this);

    // const fxIndex = ParticleManager.CreateParticle("particles/items_fx/healing_flask.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, caster)
    // ParticleManager.ReleaseParticleIndex(fxIndex)

    this.SpendCharge();

  }

}


