import React, { useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './damage.module.css';
import ParentStyles from './../stats.module.css';

type Props = {
  selectedUnit: EntityIndex,
}

const Damage = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - Damage rendered");

  const { selectedUnit } = props;

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
      <Panel className={`${Styles.image} ${ParentStyles.image}`} />
      <Label
        className={ParentStyles.label}
        text={minDamage.toFixed(0) + "-" + maxDamage.toFixed(0)}
      />
      {bonusDamage !== 0 && (
        <Label
          style={{ color: bonusDamage > 0 ? 'rgba(0, 128, 0, 0.85)' : 'rgba(175, 0, 0, 0.85)' }}
          text={(bonusDamage > 0 ? '+' : '') + bonusDamage.toFixed(0)}
        />
      )}
    </Panel>
  );

};

export default React.memo(Damage);
