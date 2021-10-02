import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles as ParentStyles } from "../Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const AttackSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - AttackRange rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [attackRange, setAttackRange] = useState(Entities.GetAttackRange(selectedUnit))

  useEffect(() => {
    const id = setInterval(() => {
      setAttackRange(Entities.GetAttackRange(selectedUnit));
    }, HUD_THINK_MEDIUM)
    return () => clearInterval(id);
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

export default withReactTimeout(AttackSpeed);
