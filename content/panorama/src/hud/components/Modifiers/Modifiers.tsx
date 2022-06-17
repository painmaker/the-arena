import React, { useContext, useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import SelectedEntityIndexContext from "../../context/SelectedEntityIndexContext";
import Modifier from "./Modifier/Modifier";
import Styles from './styles.module.css';

const getModifiers = (unit: EntityIndex) => {
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

const Modifiers = () => {

  // $.Msg("REACT-RENDER: Buffs rendered");

  const { selectedEntityIndex } = useContext(SelectedEntityIndexContext);

  const [buffs, setBuffs] = useState<BuffID[]>(getModifiers(selectedEntityIndex));

  useGameEvent("dota_portrait_unit_modifiers_changed", () => {
    setBuffs(getModifiers(selectedEntityIndex));
  }, [selectedEntityIndex]);

  useEffect(() => {
    setBuffs(getModifiers(selectedEntityIndex));
  }, [selectedEntityIndex])

  return (
    <Panel className={Styles.container}>
      {buffs.map((buff) =>
        <Modifier
          key={buff}
          buff={buff}
          selectedEntityIndex={selectedEntityIndex}
        />
      )}
    </Panel>
  );

};

export default React.memo(Modifiers);
