import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {};

const MoveSpeed = (props: Props) => {

  const [baseMoveSpeed, setBaseMoveSpeed] = useState(Entities.GetBaseMoveSpeed(Players.GetLocalPlayerPortraitUnit()));
  const [totalMoveSpeed, setTotalMoveSpeed] = useState(Entities.GetMoveSpeedModifier(Players.GetLocalPlayerPortraitUnit(), Entities.GetBaseMoveSpeed(Players.GetLocalPlayerPortraitUnit())));

  useEffect(() => {
    const id = props.setInterval(() => {
      setBaseMoveSpeed(Entities.GetBaseMoveSpeed(Players.GetLocalPlayerPortraitUnit()))
      setTotalMoveSpeed(Entities.GetMoveSpeedModifier(Players.GetLocalPlayerPortraitUnit(), Entities.GetBaseMoveSpeed(Players.GetLocalPlayerPortraitUnit())));
    }, REFRESH_RATE);
    return () => props.clearInterval(id);
  }, []);

  const increasedMoveSpeed = totalMoveSpeed - baseMoveSpeed;

  return (
    <Panel className={'attackPanelEntryContainer'}>
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
        {increasedMoveSpeed !== 0 && (
          <Label
            text={(increasedMoveSpeed > 0 ? '+' : '') + increasedMoveSpeed.toFixed(0)}
            className={'characterPanelLabel characterPanelStatsLabel'}
            style={{ color: increasedMoveSpeed > 0 ? 'green' : 'red' }}
          />
        )}

      </Panel>
    </Panel>
  );

};

export default withReactTimeout(MoveSpeed);
