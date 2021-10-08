import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";
import { SCHEDULE_THINK_MEDIUM } from "../../../App";
import { cancelSchedule } from "../../../utils/Schedule";

type Props = {
  selectedUnit: EntityIndex,
}

const MoveSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - MoveSpeed rendered");

  const { selectedUnit } = props;

  const [moveSpeed, setMoveSpeed] = useState(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
      setMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));
    };
    schedule = $.Schedule(0, update);
    return () => cancelSchedule(schedule, MoveSpeed.name);
  }, [selectedUnit]);

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
