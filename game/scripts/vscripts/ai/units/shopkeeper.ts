
declare var thisEntity: CDOTA_BaseNPC;

function Spawn(entityKeyValues: any) {

  Timers.CreateTimer(1, () => {
    print("StartGesture")
    thisEntity.AddNewModifier(undefined, undefined, "modifier_shopkeeper", undefined);
    thisEntity.StartGesture(GameActivity_t.ACT_DOTA_IDLE);
    thisEntity.SetAbsAngles(0, 180, 0);
  });

}

getfenv(1).Spawn = Spawn