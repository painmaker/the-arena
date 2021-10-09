import React, { useEffect, useState } from "react";
import { Styles as ParentStyles } from "../Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_MEDIUM } from "../../../../App";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const Damage = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - Damage rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [minDamage, setMinDamage] = useState(Entities.GetDamageMin(selectedUnit))
  const [maxDamage, setMaxDamage] = useState(Entities.GetDamageMax(selectedUnit))
  const [bonusDamage, setBonusDamage] = useState(Entities.GetDamageBonus(selectedUnit))

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
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Damage:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={minDamage.toFixed(0) + " - " + maxDamage.toFixed(0)}
          style={ParentStyles.ColumnLabel()}
        />
        {bonusDamage !== 0 && (
          <Label
            text={(bonusDamage > 0 ? ' + ' : ' - ') + Math.abs(bonusDamage)}
            style={{
              ...ParentStyles.ColumnLabel(),
              color: bonusDamage > 0 ? 'green' : 'red',
            }}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default React.memo(ReactTimeout(Damage));
