import PositionTargetBehavior from "../../shared/abstracts/PositionTargetBehavior";

export default class CastTickingBomb extends PositionTargetBehavior {
  
  readonly entity: CDOTA_BaseNPC;
  readonly ability: CDOTABaseAbility;

  constructor(entity: CDOTA_BaseNPC, ability: CDOTABaseAbility) {
    super();
    this.entity = entity;
    this.ability = ability;
  }

  getInitiative(): number {
    if (this.getTargetedPosition() !== undefined && this.ability.IsFullyCastable()) {
      return 5;
    }
    return 0;
  }

  getOrder(): ExecuteOrderOptions {
    const targetedPosition = this.getTargetedPosition();
    if (targetedPosition == undefined) {
      return {
        UnitIndex: this.entity.entindex(),
        OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_NONE,
      }  
    }
    return {
      UnitIndex: this.entity.entindex(),
      OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_POSITION,
      Position: targetedPosition,
      AbilityIndex: this.ability.entindex(),
    }
  }

  getDuration() : number {
    return 2.0;
  }

  getTargetedPosition() : Vector | undefined {
    const units = FindUnitsInRadius(
      this.entity.GetTeam(),
      this.entity.GetAbsOrigin(),
      undefined,
      this.ability.GetCastRange(this.entity.GetAbsOrigin(), undefined) || this.entity.GetAcquisitionRange(),
      DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY,
      DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO,
      DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE,
      FindOrder.FIND_ANY_ORDER,
      false
    );
    if (units.length === 0) {
      return undefined;
    }
    const unit = units[Math.floor(Math.random() * units.length)];
    return unit.GetAbsOrigin();
  }

}