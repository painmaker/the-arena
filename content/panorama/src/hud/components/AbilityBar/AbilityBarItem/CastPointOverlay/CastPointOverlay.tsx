import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  ability: AbilityEntityIndex,
}

const CastPointOverlay = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - CastPointOveraly rendered");

  const { ability } = props;

  const [degree, setDegree] = useState(0);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const offsetCastPoint = Math.max(0.1, Abilities.GetCastPoint(ability) - 0.1);
    const endtime = Game.GetGameTime() + offsetCastPoint;
    const update = () => {
      const gameTimeDifference = endtime - Game.GetGameTime();
      const degree = Math.min(0, -(360 - ((gameTimeDifference / offsetCastPoint) * 360)));
      setDegree(Number.isNaN(degree) || !Number.isFinite(degree) ? 0 : Math.round(degree));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => cancelSchedule(schedule, CastPointOverlay.name, true);
  }, [ability]);

  if (degree === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container(degree)} />
  );

};

export default React.memo(CastPointOverlay);
