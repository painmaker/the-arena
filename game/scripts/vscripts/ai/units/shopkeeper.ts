
declare var thisEntity: CDOTA_BaseNPC;

function Spawn(entityKeyValues: any) {

  Timers.CreateTimer(0, () => {
    if (thisEntity) {
      thisEntity.AddNewModifier(undefined, undefined, "modifier_shopkeeper", undefined);
      thisEntity.StartGesture(GameActivity_t.ACT_DOTA_IDLE);
      thisEntity.SetAbsAngles(0, 180, 0);
      return -1;
    }
    return 1.0;
  })


}

getfenv(1).Spawn = Spawn