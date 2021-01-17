import BaseBehavior from "./BaseBehavior";

export default abstract class UnitTargetBehavior extends BaseBehavior {
  abstract getUnitTarget(): CDOTA_BaseNPC | undefined
}