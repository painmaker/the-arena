import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";
import "../../../modifiers/abilities/heroes/dazzle/modifier_dazzle_juju_enrage";

const SOUNDS = [
  "dazzle_dazz_ability_sfx_01",
  "dazzle_dazz_ability_sfx_02",
  "dazzle_dazz_ability_sfx_03",
  "dazzle_dazz_ability_sfx_04",
  "dazzle_dazz_ability_sfx_05",
  "dazzle_dazz_ability_sfx_06",
  "dazzle_dazz_ability_sfx_07",
  "dazzle_dazz_ability_sfx_08",
  "dazzle_dazz_ability_sfx_09",
  "dazzle_dazz_ability_sfx_10",
  "dazzle_dazz_ability_sfx_11",
  "dazzle_dazz_ability_sfx_12",
  "dazzle_dazz_ability_sfx_13",
  "dazzle_dazz_ability_sfx_14",
  "dazzle_dazz_ability_sfx_15",
]

@registerAbility()
export class dazzle_juju_enrage extends BaseAbility {


  OnSpellStart(): void {

    const target = this.GetCursorTarget();
    const caster = this.GetCaster();
    const duration = this.GetSpecialValueFor("duration");

    caster.EmitSoundParams(SOUNDS[RandomInt(0, SOUNDS.length - 1)], 2.2, 2.2, 0);

    const particleName = "particles/abilities/heroes/dazzle/general/dazzle_cast_ability_a.vpcf"
    const particle = ParticleManager.CreateParticle(particleName, ParticleAttachment_t.PATTACH_POINT_FOLLOW, caster);
    ParticleManager.SetParticleControlEnt(particle, 0, caster, ParticleAttachment_t.PATTACH_POINT_FOLLOW, "attach_attack1", caster.GetOrigin(), true);
    ParticleManager.ReleaseParticleIndex(particle);

    target!.AddNewModifier(caster, this, "modifier_dazzle_juju_enrage", { duration })

  }

  GetCastRange(location: Vector, target: CDOTA_BaseNPC | undefined): number {
    return this.GetSpecialValueFor("cast_range") + this.GetCaster().GetCastRangeBonus();
  }

}


