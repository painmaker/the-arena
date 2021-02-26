import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import Modifier from "../Modifier/Modifier";

const getBuffs = (unit: EntityIndex) => {
  const buffs = [];
  for (let i = 0; i < Entities.GetNumBuffs(unit) + 1; i++) {
    const buff = Entities.GetBuff(unit, i);
    if (buff == -1) {
      continue;
    }
    if (Buffs.IsHidden(unit, buff)) {
      continue;
    }
    if (Buffs.IsDebuff(unit, buff)) {
      continue;
    }
    buffs.push(buff);
  }
  return buffs;
}

const BuffsPanel = () => {

  const [selectedUnit, setSelectedUnit] = useState(Players.GetLocalPlayerPortraitUnit());
  const [buffs, setBuffs] = useState<BuffID[]>(getBuffs(Players.GetLocalPlayerPortraitUnit()));

  useGameEvent("dota_portrait_unit_modifiers_changed", () => {
    const unit = Players.GetLocalPlayerPortraitUnit();
    setSelectedUnit(unit);
    setBuffs(getBuffs(unit));
  }, []);

  useGameEvent("dota_player_update_query_unit", () => {
    const unit = Players.GetLocalPlayerPortraitUnit();
    setSelectedUnit(unit);
    setBuffs(getBuffs(unit));
  }, []);

  useGameEvent("dota_player_update_selected_unit", () => {
    const unit = Players.GetLocalPlayerPortraitUnit();
    setSelectedUnit(unit);
    setBuffs(getBuffs(unit));
  }, []);

  return (
    <Panel className={'buffsContainer'}>
      {buffs.map((buff) =>
        <Modifier
          key={buff}
          buffId={buff}
          selectedUnit={selectedUnit}
          isDebuff={false}
        />
      )}
    </Panel>
  );

};

export default BuffsPanel;
