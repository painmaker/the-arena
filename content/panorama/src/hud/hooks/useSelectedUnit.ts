import { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../App";
import { cancelSchedule } from "../utils/Schedule";

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
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
      const unitToSelect = getGameUnitSelected();
      if (!excludedUnits.includes(Entities.GetUnitName(unitToSelect))) {
        setSelectedUnit(unitToSelect)
      }
    };
    update();
    return () => cancelSchedule(schedule, useSelectedUnit.name);
  }, []);

  return selectedUnit;

}