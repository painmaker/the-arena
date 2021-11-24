import React, { useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './magicresistance.module.css';
import ParentStyles from './../stats.module.css';

type Props = {
  selectedUnit: EntityIndex,
};

const MagicResistance = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - MagicalResistance rendered");

  const { selectedUnit } = props;

  const [magicResistance, setMagicResistance] = useState(Entities.GetMagicalArmorValue(selectedUnit));

  useInterval(() => {
    setMagicResistance(Entities.GetMagicalArmorValue(selectedUnit))
  }, HUD_THINK_MEDIUM);

  return (
    <Panel className={ParentStyles.entry}>
      <Panel className={`${Styles.image} ${ParentStyles.image}`} />
      <Label
        className={ParentStyles.label}
        text={(magicResistance * 100).toFixed(1) + "%"}
      />
    </Panel>
  );

};

export default React.memo(MagicResistance);
