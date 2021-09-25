import { useEffect, useState } from "react";

const excludedUnits = [
  "shopkeeper_abilities"
]

const getGameUnitSelected = () => {

  const queryUnit = Players.GetQueryUnit(Players.GetLocalPlayer());
  if (queryUnit !== -1) {
    return queryUnit;
  }

  const portraitUnit = Players.GetLocalPlayerPortraitUnit();
  if (portraitUnit !== -1) {
    return portraitUnit
  }

  return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());

}

export const useSelectedUnit = () => {

  const [selectedUnit, setSelectedUnit] = useState(getGameUnitSelected());

  useEffect(() => {
    let schedule: ScheduleID | undefined;
    let canceled = false;
    const update = () => {
      if (!canceled) {
        const unitToSelect = getGameUnitSelected();
        if (!excludedUnits.includes(Entities.GetUnitName(unitToSelect))) {
          setSelectedUnit(unitToSelect)
        }
        schedule = $.Schedule(0.03, update)
      }
    }
    update();
    return () => {
      canceled = true;
      try {
        if (schedule !== undefined) {
          $.CancelScheduled(schedule);
        }
      } catch {
        $.Msg("Schedule " + schedule + " already finished");
      }
    };
  }, []);

  return selectedUnit;

}
