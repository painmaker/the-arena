import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../CharacterPanel";

type Props = ReactTimeoutProps & {};

const MoveSpeed = (props: Props) => {

  const [baseMoveSpeed, setBaseMoveSpeed] = useState(Entities.GetBaseMoveSpeed(Players.GetLocalPlayerPortraitUnit()));
  const [increasedMoveSpeed, setIncreasedMoveSpeed] = useState(Entities.GetMoveSpeedModifier(Players.GetLocalPlayerPortraitUnit(), baseMoveSpeed));

  useEffect(() => {
    const id = props.setInterval(() => {
      setBaseMoveSpeed(Entities.GetBaseMoveSpeed(Players.GetLocalPlayerPortraitUnit()))
      setIncreasedMoveSpeed(Entities.GetMoveSpeedModifier(Players.GetLocalPlayerPortraitUnit(), baseMoveSpeed));
    }, REFRESH_RATE);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel hittest={false} style={{ width: "100%", flowChildren: 'right' }}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Move Speed:'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
      <Panel className={'characterPanelStatsEntry'} style={{ flowChildren: 'right' }}>
        <Label
          text={baseMoveSpeed.toFixed(0)}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
        {(increasedMoveSpeed - baseMoveSpeed) !== 0 && (
          <Label
            text={'+' + (increasedMoveSpeed - baseMoveSpeed).toFixed(0)}
            className={'characterPanelLabel characterPanelStatsLabel'}
            style={{ color: increasedMoveSpeed > 0 ? 'green' : 'red' }}
          />
        )}

      </Panel>
    </Panel>
  );

};

export default withReactTimeout(MoveSpeed);
