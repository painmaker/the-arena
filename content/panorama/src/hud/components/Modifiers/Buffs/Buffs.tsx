import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import { useSelectedUnit } from "../../../hooks/useSelectedUnit";
import Modifier from "../Modifier/Modifier";
import { Styles } from "./Styles";

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

  const selectedUnit = useSelectedUnit();
  const [buffs, setBuffs] = useState<BuffID[]>(getBuffs(selectedUnit));

  useGameEvent("dota_portrait_unit_modifiers_changed", () => {
    setBuffs(getBuffs(selectedUnit));
  }, [selectedUnit]);

  useEffect(() => {
    setBuffs(getBuffs(selectedUnit));
  }, [selectedUnit])

  return (
    <Panel style={Styles.Container()}>
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
