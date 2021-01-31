import BaseBehavior from "./shared/abstracts/BaseBehavior";
import None from "./shared/None";

export default class BehaviorSystem {

  readonly entity: CDOTA_BaseNPC;
  readonly behaviors: Array<BaseBehavior> = [];
  readonly thinkDuration: number = 0.25;
  currentBehavior: BaseBehavior;

  constructor(entity: CDOTA_BaseNPC, behaviors: any) {
    this.entity = entity;
    this.behaviors = behaviors;
    this.currentBehavior = new None(entity);
  }

  think(): number {

    const shouldChooseNextBehavior = this.ShouldChooseNextBehavior();
    if (shouldChooseNextBehavior === false) {
      return this.thinkDuration;
    }

    const newBehavior = this.ChooseNextBehavior();
    if (newBehavior === undefined) {
      return this.thinkDuration;
    }

    if (this.currentBehavior.continue !== undefined && newBehavior === this.currentBehavior) {
      this.currentBehavior.continue()
      return this.thinkDuration;
    }
 
    if (this.currentBehavior.end !== undefined) {
      this.currentBehavior.end();
    }

    newBehavior.setEndTime(GameRules.GetGameTime() + newBehavior.getDuration());

    ExecuteOrderFromTable(newBehavior.getOrder());
    
    this.currentBehavior = newBehavior;
    
    return this.thinkDuration;

  }

  ShouldChooseNextBehavior() {
    if (this.entity.IsStunned()) {
      return false;
    }
    if (this.entity.IsSilenced()) {
      return false;
    }
    return GameRules.GetGameTime() >= this.currentBehavior.getEndTime();
  }

  ChooseNextBehavior(): BaseBehavior | undefined {
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