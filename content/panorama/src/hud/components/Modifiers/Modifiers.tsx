import React, { useContext, useState } from "react";
import { HUD_THINK_FAST } from "../../App";
import SelectedEntityIndexContext from "../../context/SelectedEntityIndexContext";
import { useInterval } from "../../hooks/useInterval";
import { isEqual } from "../../utils/isEqual";
import Modifier from "./Modifier/Modifier";
import Styles from './styles.module.css';

const getModifiers = (unit: EntityIndex) => {
  const modifiers = [];
  for (let i = 0; i < Entities.GetNumBuffs(unit) + 1; i++) {
    const modifier = Entities.GetBuff(unit, i);
    if (modifier == -1) {
      continue;
    }
    if (Buffs.IsHidden(unit, modifier)) {
      continue;
    }
    modifiers.push(modifier);
  }
  return modifiers.sort((b1, b2) => Buffs.GetCreationTime(unit, b2) - Buffs.GetCreationTime(unit, b1));
}

const Modifiers = () => {

  // $.Msg("REACT-RENDER: Modifiers rendered");

  const { selectedEntityIndex } = useContext(SelectedEntityIndexContext);

  const [modifiers, setModifiers] = useState<BuffID[]>(getModifiers(selectedEntityIndex));

  useInterval(() => {
    const newModifiers = getModifiers(selectedEntityIndex);
    if (!isEqual(newModifiers, modifiers)) {
      setModifiers(newModifiers);
    }
  }, HUD_THINK_FAST)

  return (
    <Panel className={Styles.container}>
      {modifiers.map((modifier) =>
        <Modifier
          key={modifier}
          modifier={modifier}
          selectedEntityIndex={selectedEntityIndex}
        />
      )}
    </Panel>
  );

};

export default React.memo(Modifiers);
