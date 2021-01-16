import { IBehavior } from "./IBehavior";

export default class BehaviorSystem {

  readonly entity: CDOTA_BaseNPC;
  readonly behaviors: Array<IBehavior> = [];
  readonly thinkDuration: number = 0.25;
  currentBehavior: IBehavior | undefined;

  constructor(entity: CDOTA_BaseNPC, behaviors: any) {
    this.entity = entity;
    this.behaviors = behaviors;
  }

  think(): number {
    if (this.ShouldChooseNextBehavior() === true) {
      const newBehavior = this.ChooseNextBehavior();
      if (newBehavior !== undefined) {
        if (this.currentBehavior !== undefined) {
          if (newBehavior == this.currentBehavior && this.currentBehavior?.continue !== undefined) {
            this.currentBehavior.continue()
            return this.thinkDuration;
          }
          if (this.currentBehavior?.end !== undefined) {
            this.currentBehavior.end();
          }
        }
        this.currentBehavior = newBehavior;
        ExecuteOrderFromTable(this.currentBehavior.getOrder());
      }
    }
    return this.thinkDuration
  }

  ShouldChooseNextBehavior() {
    if (this.currentBehavior == undefined) {
      return true;
    }
    if (this.entity.IsStunned()) {
      return false;
    }
    if (this.entity.IsSilenced()) {
      return false;
    }
    return GameRules.GetGameTime() >= this.currentBehavior.getEndTime();
  }

  ChooseNextBehavior(): IBehavior | undefined {
    let result = undefined;
    let highestInitiative = 0;
    this.behaviors.forEach(behavior => {
      const currentInitiative = behavior.getInitiative();
      if (currentInitiative > highestInitiative) {
        result = behavior;
        highestInitiative = currentInitiative;
      }
    });
    return result;
  }

}