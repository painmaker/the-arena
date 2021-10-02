import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";
import { HUD_THINK_MEDIUM } from "../../../App";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
}

const MoveSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - MoveSpeed rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [moveSpeed, setMoveSpeed] = useState(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));

  useEffect(() => {

    const update = () => {
      setMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));
    };

    // update();
    const id = setInterval(update, HUD_THINK_MEDIUM);

    return () => clearInterval(id);

  }, [selectedUnit, setInterval, clearInterval]);

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

export default withReactTimeout(MoveSpeed);
