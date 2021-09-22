import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";

const SOUNDS = [
  "dazzle_dazz_pain_01",
  "dazzle_dazz_pain_02",
  "dazzle_dazz_pain_03",
  "dazzle_dazz_pain_04",
  "dazzle_dazz_pain_05",
  "dazzle_dazz_pain_06",
  "dazzle_dazz_pain_07",
  "dazzle_dazz_pain_08",
  "dazzle_dazz_pain_09",
  "dazzle_dazz_pain_10",
  "dazzle_dazz_pain_11",
  "dazzle_dazz_pain_12",
]

@registerAbility()
export class dazzle_sadistic_ritual extends BaseAbility {

  CastFilterResult(): UnitFilterResult {
    if (IsServer()) {
      const health = this.GetCaster().GetHealth();
      const healthLost = this.GetSpecialValueFor("health_lost");
      if (healthLost >= health) {
        return UnitFilterResult.UF_FAIL_CUSTOM;
      }
    }
    return UnitFilterResult.UF_SUCCESS;
  }

  GetCustomCastError(): string {
    return "#dota_hud_error_health_too_low";
  }

  OnSpellStart(): void {

    const caster = this.GetCaster();
    const healthLost = this.GetSpecialValueFor("health_lost");
    const manaGained = Math.min(caster.GetMaxMana() - caster.GetMana(), this.GetSpecialValueFor("mana_gained"));

    caster.EmitSoundParams(SOUNDS[RandomInt(0, SOUNDS.length - 1)], 2.2, 2.2, 0);
    caster.EmitSoundParams("Hero_Dazzle.Poison_Cast", 1.0, 1.0, 0);
    caster.EmitSoundParams("hero_bloodseeker.attack", 0.75, 0.75, 0);

    caster.ModifyHealth(caster.GetHealth() - healthLost, this, false, 0)
    caster.GiveMana(manaGained);

    const bodyParticle = ParticleManager.CreateParticle("particles/abilities/heroes/dazzle/dazzle_sadistic_ritual/dazzle_sadistic_ritual.vpcf", ParticleAttachment_t.PATTACH_POINT_FOLLOW, caster);
    ParticleManager.SetParticleControlEnt(bodyParticle, 0, caster, ParticleAttachment_t.PATTACH_POINT_FOLLOW, "attach_hitloc", caster.GetAbsOrigin(), true);
    ParticleManager.SetParticleControl(bodyParticle, 1, caster.GetAbsOrigin());
    ParticleManager.ReleaseParticleIndex(bodyParticle);

    const weaponParticle = ParticleManager.CreateParticle("particles/abilities/heroes/dazzle/general/dazzle_cast_ability_a.vpcf", ParticleAttachment_t.PATTACH_POINT_FOLLOW, caster);
    ParticleManager.SetParticleControlEnt(weaponParticle, 0, caster, ParticleAttachment_t.PATTACH_POINT_FOLLOW, "attach_attack1", caster.GetOrigin(), true);
    ParticleManager.ReleaseParticleIndex(weaponParticle);

    const damageTextParticle = ParticleManager.CreateParticle("particles/general/health_and_mana_gained_text.vpcf", ParticleAttachment_t.PATTACH_POINT_FOLLOW, caster);
    ParticleManager.SetParticleControl(damageTextParticle, 1, Vector(1, healthLost, 0));
    ParticleManager.SetParticleControl(damageTextParticle, 2, Vector(2, 2 + math.floor(math.log10(healthLost)), 0));
    ParticleManager.SetParticleControl(damageTextParticle, 3, Vector(255, 0, 0));
    ParticleManager.ReleaseParticleIndex(damageTextParticle);

    Timers.CreateTimer(0.35, () => {
      const manaTextParticle = ParticleManager.CreateParticle("particles/general/health_and_mana_gained_text.vpcf", ParticleAttachment_t.PATTACH_POINT_FOLLOW, caster);
      ParticleManager.SetParticleControl(manaTextParticle, 1, Vector(0, manaGained, 0));
      ParticleManager.SetParticleControl(manaTextParticle, 2, Vector(2, 2 + math.floor(math.log10(manaGained)), 0));
      ParticleManager.SetParticleControl(manaTextParticle, 3, Vector(30, 160, 255));
      ParticleManager.ReleaseParticleIndex(manaTextParticle);
    })

  }

}


