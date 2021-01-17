import BaseBehavior from "./BaseBehavior";

export default abstract class PositionTargetBehavior extends BaseBehavior {
  abstract getTargetedPosition(): Vector | undefined;
}