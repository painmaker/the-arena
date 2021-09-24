import { useEffect, useState } from "react";

const excludedUnits = [
  "shopkeeper_abilities"
]

const getGameUnitSelected = () => {

  const queryUnit = Players.GetQueryUnit(Players.GetLocalPlayer());
  if (queryUnit !== -1 && !excludedUnits.includes(Entities.GetUnitName(queryUnit))) {
    return queryUnit;
  }

  const portraitUnit = Players.GetLocalPlayerPortraitUnit();
  if (portraitUnit !== -1 && !excludedUnits.includes(Entities.GetUnitName(portraitUnit))) {
    return portraitUnit
  }

  return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());

}

export const useSelectedUnit = () => {

  const [selectedUnit, setSelectedUnit] = useState(getGameUnitSelected());

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = -1 as ScheduleID;
      const unitToSelect = getGameUnitSelected();
      if (!excludedUnits.includes(Entities.GetUnitName(unitToSelect))) {
        setSelectedUnit(unitToSelect)
      }
      schedule = $.Schedule(0.03, update)
    }
    schedule = $.Schedule(0, update)
    return () => {
      try {
        if (schedule !== -1) {
          $.CancelScheduled(schedule);
        }
      } catch {
        $.Msg("Schedule " + schedule + " already finished");
      }
    };
  }, []);

  return selectedUnit;

}
