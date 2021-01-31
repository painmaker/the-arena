import UnitTargetBehavior from "./abstracts/UnitTargetBehavior";

export default class Walk extends UnitTargetBehavior {
 
  entity: CDOTA_BaseNPC;

  constructor(entity: CDOTA_BaseNPC) {
    super();
    this.entity = entity;
  }

  getInitiative(): number {
    if (!this.entity.HasAttackCapability()) {
      return 0;
    }
    const unit = this.getUnitTarget();
    if (unit === undefined) {
      return 0;
    }
    return 1;
  }

  getOrder(): ExecuteOrderOptions {
    const unit = this.getUnitTarget();
    if (unit === undefined || !this.entity.HasAttackCapability()) {
      return {
        UnitIndex: this.entity.entindex(),
        OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_NONE,
      }
    }
    return {
      UnitIndex: this.entity.entindex(),
      OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_TARGET,
      TargetIndex: unit.entindex()
    }
  }

  getDuration(): number {
    return this.entity.GetAttackAnimationPoint() + 0.5;
  }

  continue(): void {
    this.setEndTime(GameRules.GetGameTime() + this.getDuration())
  }
   

  getUnitTarget(): CDOTA_BaseNPC | undefined {
    const units = FindUnitsInRadius(
      this.entity.GetTeam(),
      this.entity.GetAbsOrigin(),
      undefined,
      this.entity.GetAcquisitionRange(),
      DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY,
      DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO,
      DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE + DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NO_INVIS + DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_INVULNERABLE,
      FindOrder.FIND_CLOSEST,
      false
    );
    if (units.length === 0) {
      return undefined;
    }
    return units[0];
  }
  
}