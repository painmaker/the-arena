import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import Modifier from "../Modifier/Modifier";

const getDebuffs = (unit: EntityIndex) => {
  const debuffs = [];
  for (let i = 0; i < Entities.GetNumBuffs(unit); i++) {
    const buff = Entities.GetBuff(unit, i);
    if (buff == -1) {
      continue;
    }
    if (Buffs.IsHidden(unit, buff)) {
      continue;
    }
    if (!Buffs.IsDebuff(unit, buff)) {
      continue;
    }
    debuffs.push(buff);
  }
  return debuffs;
}

const Debuffs = () => {

  const [selectedUnit, setSelectedUnit] = useState(Players.GetLocalPlayerPortraitUnit());
  const [debuffs, setDebuffs] = useState<BuffID[]>(getDebuffs(Players.GetLocalPlayerPortraitUnit()));

  useGameEvent("dota_portrait_unit_modifiers_changed", () => {
    const unit = Players.GetLocalPlayerPortraitUnit();
    setSelectedUnit(unit);
    setDebuffs(getDebuffs(unit));
  }, []);

  useGameEvent("dota_player_update_query_unit", () => {
    const unit = Players.GetLocalPlayerPortraitUnit();
    setSelectedUnit(unit);
    setDebuffs(getDebuffs(unit));
  }, []);

  useGameEvent("dota_player_update_selected_unit", () => {
    const unit = Players.GetLocalPlayerPortraitUnit();
    setSelectedUnit(unit);
    setDebuffs(getDebuffs(unit));
  }, []);

  return (
    <Panel className={'debuffsContainer'}>
      {debuffs.map((debuff) =>
        <Modifier
          key={debuff}
          buffId={debuff}
          selectedUnit={selectedUnit}
          isDebuff={true}
        />
      )}
    </Panel>
  );

};

export default Debuffs;
