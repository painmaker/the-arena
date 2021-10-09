import React, { useEffect, useState } from "react";
import { Styles as ParentStyles } from "../Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_MEDIUM } from "../../../../App";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const AttackSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - AttackSpeed rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [attackSpeed, setAttackSpeed] = useState(Entities.GetAttackSpeed(selectedUnit))
  const [secondsPerAttack, setSecondsPerAttack] = useState(Entities.GetSecondsPerAttack(selectedUnit))

  useEffect(() => {
    const update = () => {
      setAttackSpeed(Entities.GetAttackSpeed(selectedUnit));
      setSecondsPerAttack(Entities.GetSecondsPerAttack(selectedUnit));
    };
    const id = setInterval!(update, HUD_THINK_MEDIUM);
    return () => clearInterval!(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Attack Speed:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={(attackSpeed * 100).toFixed(0) + " (" + (secondsPerAttack).toFixed(2) + 's)'}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(ReactTimeout(AttackSpeed));
