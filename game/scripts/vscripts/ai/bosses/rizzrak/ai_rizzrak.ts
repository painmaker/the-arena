import Behaviors from "../../Behaviors";
import Wander from "../../shared/Wander";
import CastTickingBomb from "./CastTickingBomb";

declare var thisEntity: CDOTA_BaseNPC;

function Spawn(entityKeyValues: any) {

  const bombAbility = thisEntity.FindAbilityByName("rizzrak_ticking_bomb");
  if (bombAbility === undefined) {
    return;
  }

  const behaviors = new Behaviors(thisEntity, [
    new Wander(thisEntity),
    new CastTickingBomb(thisEntity, bombAbility)
  ]);

  thisEntity.SetContextThink("AIThink", () => {
    if (!thisEntity.IsAlive()) {
      return -1;
    }
    return behaviors.think();
  }, 0.25);

}

getfenv(1).Spawn = Spawn  