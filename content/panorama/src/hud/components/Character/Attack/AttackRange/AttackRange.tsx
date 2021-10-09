import React, { useEffect, useState } from "react";
import { Styles as ParentStyles } from "../Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_MEDIUM } from "../../../../App";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const AttackRange = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - AttackRange rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [attackRange, setAttackRange] = useState(Entities.GetAttackRange(selectedUnit))

  useEffect(() => {
    const update = () => setAttackRange(Entities.GetAttackRange(selectedUnit));
    const id = setInterval!(update, HUD_THINK_MEDIUM);
    return () => clearInterval!(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Attack Range:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={attackRange.toFixed(0)}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(ReactTimeout(AttackRange));
