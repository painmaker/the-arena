import React, { useState } from "react";
import { SelectedUnitContext, HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import ParentStyles from './../styles.module.css';

const Damage = () => {

  // $.Msg("REACT-RENDER: Character - Damage rendered");

  const { selectedUnit } = React.useContext(SelectedUnitContext);

  const [minDamage, setMinDamage] = useState(Entities.GetDamageMin(selectedUnit));
  const [maxDamage, setMaxDamage] = useState(Entities.GetDamageMax(selectedUnit));
  const [bonusDamage, setBonusDamage] = useState(Entities.GetDamageBonus(selectedUnit));

  useInterval(() => {
    setMinDamage(Entities.GetDamageMin(selectedUnit));
    setMaxDamage(Entities.GetDamageMax(selectedUnit));
    setBonusDamage(Entities.GetDamageBonus(selectedUnit));
  }, HUD_THINK_MEDIUM)

  return (
    <Panel className={ParentStyles.entry}>
      <Panel className={ParentStyles.imageContainer}>
        <Image
          src={'file://{images}/icon_damage.png'}
          className={ParentStyles.image}
        />
      </Panel>
      <Panel className={ParentStyles.labelContainer}>
        {bonusDamage !== 0 && (
          <Label
            className={ParentStyles.label}
            style={{ color: bonusDamage > 0 ? 'rgba(0, 128, 0, 0.85)' : 'rgba(175, 0, 0, 0.85)' }}
            text={(bonusDamage > 0 ? '+' : '') + bonusDamage.toFixed(0)}
          />
        )}
        <Label
          className={ParentStyles.label}
          text={minDamage.toFixed(0) + " - " + maxDamage.toFixed(0)}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(Damage);
