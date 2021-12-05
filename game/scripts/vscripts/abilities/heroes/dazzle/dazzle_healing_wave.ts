import { BaseAbility, registerAbility } from "../../../lib/dota_ts_adapter";

const PARTICLE_NAME = "particles/units/heroes/hero_dazzle/dazzle_shadow_wave.vpcf";

const SOUNDS = [
  "dazzle_dazz_ability_shadowave_01",
  "dazzle_dazz_ability_shadowave_02",
  "dazzle_dazz_ability_shadowave_03",
  "dazzle_dazz_ability_shadowave_04",
  "dazzle_dazz_ability_shadowave_05",
  "dazzle_dazz_ability_shadowave_06",
  "dazzle_dazz_ability_shadowave_07",
  "dazzle_dazz_ability_shadowave_08",
  "dazzle_dazz_ability_shadowave_10",
  "dazzle_dazz_ability_shadowave_11",
  "dazzle_dazz_ability_shadowave_12",
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
export class dazzle_healing_wave extends BaseAbility {

  OnSpellStart(): void {

    const healedUnits: CDOTA_BaseNPC[] = [];
    const jumpRadius = this.GetSpecialValueFor("jump_radius")
    const jumpDelay = this.GetSpecialValueFor("jump_delay")
    const healingDecay = this.GetSpecialValueFor("healing_decay")

    let healing = this.GetSpecialValueFor("healing")
    let jumpCount = this.GetSpecialValueFor("jump_count")
    let source = this.GetCaster();
    let target = this.GetCursorTarget()!;

    source.EmitSoundParams(SOUNDS[RandomInt(0, SOUNDS.length - 1)], 2.2, 2.2, 0);

    Timers.CreateTimer(0, () => {

      const isTargetHealed = healedUnits.includes(target);
      const isSourceHealed = healedUnits.includes(source);
      const isSelfcast = source === target;

      this.PlaySelfHealParticle(source);

      source.EmitSoundParams("Hero_Dazzle.Shadow_Wave", 2.2, 2.2, 0.0);

      if (!isSourceHealed) {
        this.PlayTextParticle(source, healing);
        source.Heal(healing, this);
        healedUnits.push(source);
      }

      if (!isTargetHealed && !isSelfcast) {
        this.PlayWaveParticle(source, target);
        this.PlayTextParticle(target, healing);
        target.Heal(healing, this);
        healedUnits.push(target);
        healing = healing - healingDecay;
      }

      jumpCount = isSelfcast ? jumpCount : jumpCount - 1;
      if (jumpCount <= 0) {
        return;
      }

      const allies = FindUnitsInRadius(
        target.GetTeamNumber(),
        target.GetOrigin(),
        undefined,
        jumpRadius,
        this.GetAbilityTargetTeam(),
        this.GetAbilityTargetType(),
        this.GetAbilityTargetFlags(),
        FindOrder.FIND_ANY_ORDER,
        false
      ).sort((ally1, ally2) => ally2.GetHealthDeficit() - ally1.GetHealthDeficit());

      let nextTarget: CDOTA_BaseNPC | undefined = undefined;
      for (let ally of allies) {
        if (!healedUnits.includes(ally)) {
          nextTarget = ally;
          break;
        }
      }

      if (!nextTarget) {
        return;
      }

      source = target;
      target = nextTarget;

      return jumpDelay;

    });

  }

  private PlayWaveParticle(source: CDOTA_BaseNPC, target: CDOTA_BaseNPC) {
    const waveParticle = ParticleManager.CreateParticle(PARTICLE_NAME, ParticleAttachment_t.PATTACH_POINT_FOLLOW, this.GetCaster());
    ParticleManager.SetParticleControlEnt(waveParticle, 0, source, ParticleAttachment_t.PATTACH_POINT_FOLLOW, source === this.GetCaster() ? 'attach_attack1' : 'attach_hitloc', source.GetOrigin(), true);
    ParticleManager.SetParticleControlEnt(waveParticle, 1, target, ParticleAttachment_t.PATTACH_POINT_FOLLOW, "attach_hitloc", target.GetOrigin(), true);
    ParticleManager.ReleaseParticleIndex(waveParticle);
  }

  private PlaySelfHealParticle(source: CDOTA_BaseNPC) {
    const healParticle = ParticleManager.CreateParticle(PARTICLE_NAME, ParticleAttachment_t.PATTACH_POINT_FOLLOW, this.GetCaster());
    ParticleManager.SetParticleControlEnt(healParticle, 0, source, ParticleAttachment_t.PATTACH_POINT_FOLLOW, "attach_hitloc", source.GetOrigin(), true);
    ParticleManager.SetParticleControlEnt(healParticle, 1, source, ParticleAttachment_t.PATTACH_POINT_FOLLOW, "attach_hitloc", source.GetOrigin(), true);
    ParticleManager.ReleaseParticleIndex(healParticle);
  }

  private PlayTextParticle(target: CDOTA_BaseNPC, healing: number) {
    const healTargetTextParticle = ParticleManager.CreateParticle("particles/general/health_and_mana_gained_text.vpcf", ParticleAttachment_t.PATTACH_POINT_FOLLOW, target);
    ParticleManager.SetParticleControl(healTargetTextParticle, 1, Vector(0, healing, 0));
    ParticleManager.SetParticleControl(healTargetTextParticle, 2, Vector(2, 2 + math.floor(math.log10(healing)), 0));
    ParticleManager.SetParticleControl(healTargetTextParticle, 3, Vector(60, 255, 60));
    ParticleManager.ReleaseParticleIndex(healTargetTextParticle);
  }

  GetCastRange(location: Vector, target: CDOTA_BaseNPC | undefined): number {
    return this.GetSpecialValueFor("cast_range") + this.GetCaster().GetCastRangeBonus();
  }

}


