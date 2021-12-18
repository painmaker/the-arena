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
export class dazzle_depraved_healing extends BaseAbility {

  CastFilterResultTarget(target: CDOTA_BaseNPC): UnitFilterResult {
    if (IsServer()) {
      const damage = this.GetSpecialValueFor("damage");
      const heal = this.GetSpecialValueFor("heal");
      const caster = this.GetCaster();
      const health = caster.GetHealth();
      const threshold = caster === target ? health + heal : health;
      if (damage >= threshold) {
        return UnitFilterResult.UF_FAIL_CUSTOM;
      }
    }
    return UnitFilterResult.UF_SUCCESS;
  }

  GetCustomCastErrorTarget(): string {
    return "#dota_hud_error_health_too_low";
  }

  OnSpellStart(): void {

    const heal = this.GetSpecialValueFor('heal');
    const damage = this.GetSpecialValueFor('damage');

    const caster = this.GetCaster();
    const target = this.GetCursorTarget()!;

    caster.EmitSoundParams(SOUNDS[RandomInt(0, SOUNDS.length - 1)], 2.2, 2.2, 0);
    caster.EmitSoundParams("Hero_Dazzle.Poison_Cast", 1.0, 1.0, 0);
    caster.EmitSoundParams("hero_bloodseeker.attack", 0.75, 0.75, 0);

    target.Heal(heal, this);

    ApplyDamage({
      victim: caster,
      attacker: caster,
      damage: damage,
      damage_type: this.GetAbilityDamageType(),
      damage_flags: DOTADamageFlag_t.DOTA_DAMAGE_FLAG_NON_LETHAL,
      ability: this,
    });

  }

}


