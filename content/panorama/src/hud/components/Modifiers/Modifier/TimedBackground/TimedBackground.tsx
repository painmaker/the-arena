import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
}

const TimedBackground = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers - TimedBackground rendered");

  const { buff, selectedUnit, isDebuff } = props;

  const [remaining, setRemaining] = useState(Math.max(0, Buffs.GetRemainingTime(selectedUnit, buff)));
  const [duration, setDuration] = useState(Math.max(0, Buffs.GetDuration(selectedUnit, buff)));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setRemaining(Math.max(0, Buffs.GetRemainingTime(selectedUnit, buff)));
      setDuration(Math.max(0, Buffs.GetDuration(selectedUnit, buff)));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => cancelSchedule(schedule, TimedBackground.name);
  }, [buff, selectedUnit]);

  let degree = Math.max(0, (remaining / duration) * 360);
  if (Number.isNaN(degree) || !Number.isFinite(degree)) {
    degree = 0;
  }

  return (
    <Panel style={Styles.Container(isDebuff, degree)} />
  );

};

export default React.memo(TimedBackground);
