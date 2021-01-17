import BaseBehavior from "./abstracts/BaseBehavior";

export default class None extends BaseBehavior {

  entity: CDOTA_BaseNPC;

  constructor(entity: CDOTA_BaseNPC) {
    super();
    this.entity = entity;
  }

  getDuration() : number {
    return 1.0;
  }

  getInitiative(): number {
    return 0;
  }

  getOrder(): ExecuteOrderOptions {
    return {
      UnitIndex: this.entity.entindex(),
      OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_NONE,
    }
  }


}