import React, { useState } from "react";
import { Context, HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './armor.module.css';
import ParentStyles from './../stats.module.css';

const Armor = () => {

  $.Msg("REACT-RENDER: Stats - Armor rendered");

  const { selectedUnit } = React.useContext(Context);

  const [armor, setArmor] = useState(Entities.GetPhysicalArmorValue(selectedUnit));
  const [bonusArmor, setBonusArmor] = useState(Entities.GetBonusPhysicalArmor(selectedUnit));

  useInterval(() => {
    setArmor(Entities.GetPhysicalArmorValue(selectedUnit));
    setBonusArmor(Entities.GetBonusPhysicalArmor(selectedUnit));
  }, HUD_THINK_MEDIUM);

  return (
    <Panel className={ParentStyles.entry}>
      <Panel className={ParentStyles.imageContainer}>
        <Image 
          src={'file://{images}/icon_armor.png'}
          className={ParentStyles.image} 
        />
      </Panel>
      <Panel className={ParentStyles.labelContainer}>
        {bonusArmor !== 0 && (
          <Label
            className={ParentStyles.label}
            style={{ color: bonusArmor > 0 ? 'rgb(0, 128, 0)' : 'rgb(175, 0, 0)' }}
            text={(bonusArmor > 0 ? "+" : "") + bonusArmor.toFixed(1)}
          />
        )}
          <Label
          className={ParentStyles.label}
          text={(armor - bonusArmor).toFixed(1)}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(Armor);
