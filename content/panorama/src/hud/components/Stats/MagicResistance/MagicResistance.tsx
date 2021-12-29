import React, { useState } from "react";
import { Context, HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import ParentStyles from './../stats.module.css';

const MagicResistance = () => {

  // $.Msg("REACT-RENDER: Stats - MagicalResistance rendered");

  const { selectedUnit } = React.useContext(Context);

  const [magicResistance, setMagicResistance] = useState(Entities.GetMagicalArmorValue(selectedUnit));

  useInterval(() => {
    setMagicResistance(Entities.GetMagicalArmorValue(selectedUnit))
  }, HUD_THINK_MEDIUM);

  return (
    <Panel className={ParentStyles.entry}>
      <Panel className={ParentStyles.imageContainer}>
        <Image 
          src={'file://{images}/icon_magic_resist.png'}
          className={ParentStyles.image} 
        />
      </Panel>
      <Panel className={ParentStyles.labelContainer}>
        <Label
          className={ParentStyles.label}
          text={(magicResistance * 100).toFixed(1) + " % "}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(MagicResistance);
