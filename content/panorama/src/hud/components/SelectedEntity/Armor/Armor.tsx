import React, { useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import ParentStyles from './../styles.module.css';

type Props = {
  selectedEntityIndex: EntityIndex,
}

const Armor = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - Armor rendered");

  const { selectedEntityIndex } = props;

  const [armor, setArmor] = useState(Entities.GetPhysicalArmorValue(selectedEntityIndex));
  const [bonusArmor, setBonusArmor] = useState(Entities.GetBonusPhysicalArmor(selectedEntityIndex));

  useInterval(() => {
    setArmor(Entities.GetPhysicalArmorValue(selectedEntityIndex));
    setBonusArmor(Entities.GetBonusPhysicalArmor(selectedEntityIndex));
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
