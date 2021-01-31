import Behaviors from "../../Behaviors";
import Walk from "../../shared/Walk";
import Attack from "../../shared/Attack";
import CastTickingBomb from "./CastTickingBomb";

declare var thisEntity: CDOTA_BaseNPC;

function Spawn(entityKeyValues: any) {

  const bombAbility = thisEntity.FindAbilityByName("rizzrak_ticking_bomb");
  if (bombAbility === undefined) {
    return;
  }

  const behaviors = new Behaviors(thisEntity, [
    new Walk(thisEntity),
    new Attack(thisEntity),
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