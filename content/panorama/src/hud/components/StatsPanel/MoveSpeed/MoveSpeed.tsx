import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

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
    <Panel className={'statsPanelEntryOuterContainer'} style={{ marginRight: '0px', minWidth: '0px' }}>
      <Panel className={'statsPanelEntryInnerContainer'}>
        <Panel className={'statsPanelMoveSpeedImage'} />
        <Label className={'statsPanelLabel'} text={moveSpeed.toFixed(0)} />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(MoveSpeed);
