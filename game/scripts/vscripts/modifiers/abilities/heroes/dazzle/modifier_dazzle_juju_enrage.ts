import { BaseModifier, registerModifier } from "../../../../lib/dota_ts_adapter";

const PARTICLE_PATH = "particles/abilities/heroes/dazzle/dazzle_juju_enrage/"

@registerModifier()
export class modifier_dazzle_juju_enrage extends BaseModifier {

  bonusAttackSpeed: number = 0;
  bonusMoveSpeed: number = 0;
  bonuseDamage: number = 0;
  damage: number = 0;
  interval: number = 0;

  OnCreated(): void {

    this.bonusAttackSpeed = this.GetAbility()!.GetSpecialValueFor("attack_speed");
    this.bonusMoveSpeed = this.GetAbility()!.GetSpecialValueFor("move_speed");
    this.bonuseDamage = this.GetAbility()!.GetSpecialValueFor("bonus_damage");
    this.damage = this.GetAbility()!.GetSpecialValueFor("damage");
    this.interval = this.GetAbility()!.GetSpecialValueFor("damage_interval");

    if (IsServer()) {

      const parent = this.GetParent();

      parent.EmitSoundParams("Hero_Dazzle.Poison_Touch", 2.2, 2.2, 0.25);

      const bodyParticle = ParticleManager.CreateParticle(PARTICLE_PATH + "dazzle_juju_enrage.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, parent);
      ParticleManager.SetParticleControlEnt(bodyParticle, 0, parent, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, "attach_hitloc", parent.GetOrigin(), true);
      this.AddParticle(bodyParticle, false, false, 0, false, false);

      this.OnIntervalThink();
      this.StartIntervalThink(this.interval);

    }

  }

  OnIntervalThink(): void {

    const parent = this.GetParent();
    const caster = this.GetCaster()!;

    ApplyDamage({
      victim: parent,
      attacker: caster,
      damage: this.damage,
      damage_type: this.GetAbility()!.GetAbilityDamageType(),
      damage_flags: DOTADamageFlag_t.DOTA_DAMAGE_FLAG_NON_LETHAL,
      ability: this.GetAbility(),
    });

    parent.EmitSoundParams("Hero_Dazzle.Poison_Tick", 0.35, 0.35, 0);

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

  OnDestroy(): void {
    this.StartIntervalThink(-1);
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
    return this.GetAbility()!.GetLevel() * 5;
  }

  OnTooltip(): number {
    return this.damage;
  }

  OnTooltip2(): number {
    return this.interval;
  }

}
