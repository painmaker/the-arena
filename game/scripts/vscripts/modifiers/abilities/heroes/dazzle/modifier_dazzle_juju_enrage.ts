import { BaseModifier, registerModifier } from "../../../../lib/dota_ts_adapter";

const PARTICLE_PATH = "particles/abilities/heroes/dazzle/dazzle_juju_enrage/"

@registerModifier()
export class modifier_dazzle_juju_enrage extends BaseModifier {

  bonusAttackSpeed: number = 0;
  bonusMoveSpeed: number = 0;
  bonuseDamage: number = 0;
  damage: number = 0;
  interval: number = 0;
  isDestroyed: boolean = false;

  OnDestroy(): void {
    this.isDestroyed = true;
  }

  OnRefresh(params: Object): void {
    this.bonusAttackSpeed = this.GetAbility()!.GetSpecialValueFor("attack_speed");
    this.bonusMoveSpeed = this.GetAbility()!.GetSpecialValueFor("move_speed");
    this.bonuseDamage = this.GetAbility()!.GetSpecialValueFor("bonus_damage");
    this.damage = this.GetAbility()!.GetSpecialValueFor("damage");
    this.interval = this.GetAbility()!.GetSpecialValueFor("damage_interval");
    if (IsServer()) {
      this.GetParent().EmitSoundParams("Hero_Dazzle.Poison_Touch", 2.2, 2.2, 0.25);
    }
  }

  OnCreated(): void {

    const ability = this.GetAbility();

    if (!ability) {
      this.Destroy();
      return;
    }

    this.bonusAttackSpeed = this.GetAbility()!.GetSpecialValueFor("attack_speed");
    this.bonusMoveSpeed = this.GetAbility()!.GetSpecialValueFor("move_speed");
    this.bonuseDamage = this.GetAbility()!.GetSpecialValueFor("bonus_damage");
    this.damage = this.GetAbility()!.GetSpecialValueFor("damage");
    this.interval = this.GetAbility()!.GetSpecialValueFor("damage_interval");

    if (IsServer()) {

      const parent = this.GetParent();
      const caster = this.GetCaster()!;

      parent.EmitSoundParams("Hero_Dazzle.Poison_Touch", 2.2, 2.2, 0.25);

      const bodyParticle = ParticleManager.CreateParticle(PARTICLE_PATH + "dazzle_juju_enrage.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, parent);
      ParticleManager.SetParticleControlEnt(bodyParticle, 0, parent, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, "attach_hitloc", parent.GetOrigin(), true);
      this.AddParticle(bodyParticle, false, false, 0, false, false);

      Timers.CreateTimer(0, () => {

        if (this.isDestroyed) {
          return;
        }

        Entities.FindByName(undefined, "")

        ApplyDamage({
          victim: parent,
          // attacker: parent === caster ? (GameRules.dummy || caster) : caster,
          attacker: caster,
          damage: this.damage,
          damage_type: ability.GetAbilityDamageType(),
          damage_flags: DOTADamageFlag_t.DOTA_DAMAGE_FLAG_NON_LETHAL,
          ability: ability,
        });

        parent.EmitSoundParams("Hero_Dazzle.Poison_Tick", 0.35, 0.35, 0);

        return this.interval;

      });

    }

  }

  DeclareFunctions(): modifierfunction[] {
    return [
      modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
      modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
      modifierfunction.MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
      modifierfunction.MODIFIER_PROPERTY_MODEL_SCALE,
      modifierfunction.MODIFIER_PROPERTY_TOOLTIP,
      modifierfunction.MODIFIER_PROPERTY_TOOLTIP2,
    ];
  }

  GetModifierAttackSpeedBonus_Constant(): number {
    return this.bonusAttackSpeed;
  }

  GetModifierMoveSpeedBonus_Constant(): number {
    return this.bonusMoveSpeed;
  }

  GetModifierPreAttack_BonusDamage(): number {
    return this.bonuseDamage
  }

  GetModifierModelScale(): number {
    return 25;
  }

  OnTooltip(): number {
    return this.damage;
  }

  OnTooltip2(): number {
    return this.interval;
  }

}
