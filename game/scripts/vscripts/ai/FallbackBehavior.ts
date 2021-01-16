import { IBehavior } from "./IBehavior";

class FallbackBehavior implements IBehavior {

  entity: CDOTA_BaseNPC;
  endTime: number | undefined;

  constructor(entity: CDOTA_BaseNPC) {
    this.entity = entity;
    this.endTime = undefined;
  }

  getInitiative(): number {

    const unit = FindUnitsInRadius(
      this.entity.GetTeam(),
      this.entity.GetAbsOrigin(),
      undefined,
      this.entity.GetAcquisitionRange(),
      DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY,
      DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO,
      DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE + DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NO_INVIS + DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_INVULNERABLE,
      FindOrder.FIND_ANY_ORDER,
      false
    )

    if (unit.length === 0) {
      return 1;
    }

    if (!this.entity.HasAttackCapability()) {
      return 1;
    }

    return 0;

  }

  getOrder(): ExecuteOrderOptions {
    this.endTime = GameRules.GetGameTime();
    if (this.entity.HasAttackCapability()) {
      return {
        UnitIndex: this.entity.entindex(),
        OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_MOVE,
        Position: (this.entity.GetAbsOrigin() + RandomVector(1000)) as Vector,
      }
    }
    return {
      UnitIndex: this.entity.entindex(),
      OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_TO_POSITION,
      Position: (this.entity.GetAbsOrigin() + RandomVector(1000)) as Vector,
    }
  }

  getEndTime(): number {
    return (this.endTime || GameRules.GetGameTime()) + math.random(0.5, 3.5);
  }

}

export default FallbackBehavior;