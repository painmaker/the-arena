import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../../App";
import { Styles as ParentStyles } from "../Styles";

type Props = {
  selectedUnit: EntityIndex,
};

const MoveSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - MoveSpeed rendered");

  const { selectedUnit } = props;

  const [baseMoveSpeed, setBaseMoveSpeed] = useState(Entities.GetBaseMoveSpeed(selectedUnit));
  const [totalMoveSpeed, setTotalMoveSpeed] = useState(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      const baseMoveSpeed = Entities.GetBaseMoveSpeed(selectedUnit);
      setBaseMoveSpeed(baseMoveSpeed);
      setTotalMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, baseMoveSpeed));
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [selectedUnit]);

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

export default React.memo(MoveSpeed);
