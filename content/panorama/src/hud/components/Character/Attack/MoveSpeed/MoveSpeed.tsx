import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../../../hooks/useSelectedUnit";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {
  // ownprops
};

const MoveSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - MoveSpeed rendered");

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [baseMoveSpeed, setBaseMoveSpeed] = useState(Entities.GetBaseMoveSpeed(selectedUnit));
  const [totalMoveSpeed, setTotalMoveSpeed] = useState(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));

  useEffect(() => {
    const id = setInterval(() => {
      setBaseMoveSpeed(Entities.GetBaseMoveSpeed(selectedUnit))
      setTotalMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));
    }, REFRESH_RATE);
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

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
