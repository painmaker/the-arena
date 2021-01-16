import Behaviors from "../../Behaviors";
import FallbackBehavior from "../../FallbackBehavior";

declare var thisEntity: CDOTA_BaseNPC;

function Spawn(entityKeyValues: any) {

  const behaviors = new Behaviors(thisEntity, [
    new FallbackBehavior(thisEntity)
  ]);

  thisEntity.SetContextThink("AIThink", () => {
    if (!thisEntity.IsAlive()) {
      return -1;
    }
    return behaviors.think();
  }, 0.25);

}

getfenv(1).Spawn = Spawn  