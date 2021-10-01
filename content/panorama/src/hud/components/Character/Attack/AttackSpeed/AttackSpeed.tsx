import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles as ParentStyles } from "../Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const AttackSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - AttackSpeed rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [attackSpeed, setAttackSpeed] = useState(Entities.GetAttackSpeed(selectedUnit))
  const [secondsPerAttack, setSecondsPerAttack] = useState(Entities.GetSecondsPerAttack(selectedUnit))

  useEffect(() => {
    const id = setInterval(() => {
      setAttackSpeed(Entities.GetAttackSpeed(selectedUnit));
      setSecondsPerAttack(Entities.GetSecondsPerAttack(selectedUnit));
    }, HUD_THINK_MEDIUM)
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Label
      text={(attackSpeed * 100).toFixed(0) + " (" + (secondsPerAttack).toFixed(2) + 's)'}
      style={ParentStyles.ColumnLabel()}
    />
  );

};

export default withReactTimeout(AttackSpeed);
