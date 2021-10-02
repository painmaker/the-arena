import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles as ParentStyles } from "../Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const MoveSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - MoveSpeed rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [baseMoveSpeed, setBaseMoveSpeed] = useState(Entities.GetBaseMoveSpeed(selectedUnit));
  const [totalMoveSpeed, setTotalMoveSpeed] = useState(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));

  useEffect(() => {
    const id = setInterval(() => {
      setBaseMoveSpeed(Entities.GetBaseMoveSpeed(selectedUnit))
      setTotalMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));
    }, HUD_THINK_MEDIUM);
    return () => clearInterval(id);
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

export default withReactTimeout(MoveSpeed);
