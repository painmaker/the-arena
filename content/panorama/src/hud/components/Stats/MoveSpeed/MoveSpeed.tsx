import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";

type Props = ReactTimeoutProps & {}

const MoveSpeed = (props: Props) => {

  const [moveSpeed, setMoveSpeed] = useState(Entities.GetMoveSpeedModifier(Players.GetLocalPlayerPortraitUnit(), Entities.GetBaseMoveSpeed(Players.GetLocalPlayerPortraitUnit())));

  useEffect(() => {
    const id = props.setInterval(() => {
      setMoveSpeed(Entities.GetMoveSpeedModifier(Players.GetLocalPlayerPortraitUnit(), Entities.GetBaseMoveSpeed(Players.GetLocalPlayerPortraitUnit())));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel style={{ ...ParentStyles.Entry(), marginRight: '0px' }} >
      <Panel style={Styles.Image()} />
      <Label
        style={ParentStyles.Label()}
        text={moveSpeed.toFixed(0)}
      />
    </Panel>
  );

};

export default withReactTimeout(MoveSpeed);
