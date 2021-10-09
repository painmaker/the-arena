import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../../App";
import { Styles as ParentStyles } from "../Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const MoveSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - MoveSpeed rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [baseMoveSpeed, setBaseMoveSpeed] = useState(Entities.GetBaseMoveSpeed(selectedUnit));
  const [totalMoveSpeed, setTotalMoveSpeed] = useState(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));

  useEffect(() => {
    const update = () => {
      const baseMoveSpeed = Entities.GetBaseMoveSpeed(selectedUnit);
      setBaseMoveSpeed(baseMoveSpeed);
      setTotalMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, baseMoveSpeed));
    };
    const id = setInterval!(update, HUD_THINK_MEDIUM);
    return () => clearInterval!(id);
  }, [selectedUnit, setInterval, clearInterval]);

  const increasedMoveSpeed = totalMoveSpeed - baseMoveSpeed;

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Movement Speed:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={baseMoveSpeed.toFixed(0)}
          style={ParentStyles.ColumnLabel()}
        />
        {increasedMoveSpeed !== 0 && (
          <Label
            text={(increasedMoveSpeed > 0 ? ' + ' : ' - ') + Math.abs(increasedMoveSpeed).toFixed(0)}
            style={{
              ...ParentStyles.ColumnLabel(),
              color: increasedMoveSpeed > 0 ? 'green' : 'red'
            }}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default React.memo(ReactTimeout(MoveSpeed));
