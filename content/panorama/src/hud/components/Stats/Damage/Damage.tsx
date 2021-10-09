import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";
import { HUD_THINK_MEDIUM } from "../../../App";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
}

const Damage = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - Damage rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [minDamage, setMinDamage] = useState(Entities.GetDamageMin(selectedUnit));
  const [maxDamage, setMaxDamage] = useState(Entities.GetDamageMax(selectedUnit));
  const [bonusDamage, setBonusDamage] = useState(Entities.GetDamageBonus(selectedUnit));

  useEffect(() => {
    const update = () => {
      setMinDamage(Entities.GetDamageMin(selectedUnit));
      setMaxDamage(Entities.GetDamageMax(selectedUnit));
      setBonusDamage(Entities.GetDamageBonus(selectedUnit));
    };
    const id = setInterval!(update, HUD_THINK_MEDIUM);
    return () => clearInterval!(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel style={ParentStyles.Entry()}>
      <Panel style={Styles.Image()} />
      <Label
        style={ParentStyles.Label()}
        text={minDamage.toFixed(0) + "-" + maxDamage.toFixed(0)}
      />
      {bonusDamage !== 0 && (
        <Label
          style={{ color: bonusDamage > 0 ? 'rgba(0, 128, 0, 0.75)' : 'rgba(175, 0, 0, 0.75)' }}
          text={(bonusDamage > 0 ? '+' : '') + "(" + bonusDamage.toFixed(0) + ")"}
        />
      )}
    </Panel>
  );

};

export default React.memo(ReactTimeout(Damage));
