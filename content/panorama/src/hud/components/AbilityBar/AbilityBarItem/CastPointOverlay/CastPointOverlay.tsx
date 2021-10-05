import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { Styles } from "./Styles";

type Props = {
  ability: AbilityEntityIndex,
}

const Cooldown = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - CastPointOveraly rendered");

  const { ability } = props;

  const [castPoint, setCastPoint] = useState(Math.max(0, Abilities.GetCastPoint(ability)));
  const [isInAbilityPhase, setIsInAbilityPhase] = useState(Abilities.IsInAbilityPhase(ability));
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      const offsetCastPoint = Math.max(0.1, Abilities.GetCastPoint(ability) - 0.1);
      setCastPoint(offsetCastPoint);
      setIsInAbilityPhase(Abilities.IsInAbilityPhase(ability));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [ability]);

  useEffect(() => {

    let scheduleX = -1 as ScheduleID;

    const endtime = Game.GetGameTime() + castPoint;

    const update = () => {
      if (isInAbilityPhase) {
        const gameTimeDifference = endtime - Game.GetGameTime();
        const degree = Math.min(0, -(360 - ((gameTimeDifference / castPoint) * 360)));
        setDegree(Number.isNaN(degree) || !Number.isFinite(degree) ? 0 : Math.round(degree));
      } else {
        setDegree(0);
      }
      scheduleX = $.Schedule(SCHEDULE_THINK_FAST, update);
    };

    update();

    return () => { try { $.CancelScheduled(scheduleX) } catch { $.Msg("3 Schedule not found: " + scheduleX) }; }

  }, [isInAbilityPhase, castPoint])

  if (degree === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container(degree)} />
  );

};

export default React.memo(Cooldown);
