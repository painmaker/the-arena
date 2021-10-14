import React, { useState } from "react";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";
import { HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";

type Props = {
  selectedUnit: EntityIndex,
}

const MoveSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - MoveSpeed rendered");

  const { selectedUnit } = props;

  const [moveSpeed, setMoveSpeed] = useState(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));

  useInterval(() => {
    setMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)))
  }, HUD_THINK_MEDIUM);

  return (
    <Panel style={ParentStyles.Entry()} >
      <Panel style={Styles.Image()} />
      <Label
        style={ParentStyles.Label()}
        text={moveSpeed.toFixed(0)}
      />
    </Panel>
  );

};

export default React.memo(MoveSpeed);
