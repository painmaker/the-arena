import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../App";
import { cancelSchedule } from "../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  unit: EntityIndex,
};

const Stunned = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingBars - Stunned rendered");

  const { unit } = props;

  const [isStunned, setIsStunned] = useState(Entities.IsStunned(unit));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
      setIsStunned(Entities.IsStunned(unit));
    };
    update();
    return () => cancelSchedule(schedule, Stunned.name);
  }, [unit]);

  $.Msg(isStunned);

  return (
    <Panel hittest={false} style={Styles.Container()}>
      <Label
        style={Styles.Label()}
        text={isStunned ? 'Stunned' : ''}
      />
    </Panel>
  );

}

export default React.memo(Stunned);