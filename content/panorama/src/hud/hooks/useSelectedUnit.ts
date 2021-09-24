import { useState } from "react";
import { useGameEvent } from "react-panorama";

const excludedUnits = [
  "shopkeeper_abilities"
]

export const useSelectedUnit = () => {

  const [selectedUnit, setSelectedUnit] = useState(Players.GetLocalPlayerPortraitUnit());

  useGameEvent("dota_player_update_query_unit", (event) => {
    $.Msg("query")
    const unit = Players.GetQueryUnit(Players.GetLocalPlayer());
    if (unit !== -1) {
      if (!excludedUnits.includes(Entities.GetUnitName(unit))) {
        $.Msg("Setting query unit: " + Entities.GetUnitName(unit))
        setSelectedUnit(unit);
      }
    } else {
      $.Msg("query is -1, using fallback " + Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())))
      setSelectedUnit(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))
    }
  }, []);

  useGameEvent("dota_player_update_selected_unit", (event) => {
    $.Msg("select")
    const unit = Players.GetLocalPlayerPortraitUnit();
    if (unit !== -1) {
      if (!excludedUnits.includes(Entities.GetUnitName(unit))) {
        $.Msg("Setting select unit: " + Entities.GetUnitName(unit))
        setSelectedUnit(unit);
      }
    } else {
      $.Msg("select is -1, using fallback " + Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())))
      setSelectedUnit(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))
    }
  }, []);

  return selectedUnit;

}