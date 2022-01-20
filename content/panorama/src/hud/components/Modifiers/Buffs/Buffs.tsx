import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import { SelectedUnitContext } from "../../../App";
import Modifier from "../Modifier/Modifier";
import Styles from './styles.module.css';

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
      // continue;
    }
    buffs.push(buff);
  }
  return buffs.sort((b1, b2) => Buffs.GetCreationTime(unit, b2) - Buffs.GetCreationTime(unit, b1));
}


const BuffsPanel = () => {

  // $.Msg("REACT-RENDER: Buffs rendered");

  const { selectedUnit } = React.useContext(SelectedUnitContext);

  const [buffs, setBuffs] = useState<BuffID[]>(getBuffs(selectedUnit));

  useGameEvent("dota_portrait_unit_modifiers_changed", () => {
    setBuffs(getBuffs(selectedUnit));
  }, [selectedUnit]);

  useEffect(() => {
    setBuffs(getBuffs(selectedUnit));
  }, [selectedUnit])

  return (
    <Panel className={Styles.container}>
      {buffs.map((buff) =>
        <Modifier
          key={buff}
          buff={buff}
          selectedUnit={selectedUnit}
        />
      )}
    </Panel>
  );

};

export default React.memo(BuffsPanel);
