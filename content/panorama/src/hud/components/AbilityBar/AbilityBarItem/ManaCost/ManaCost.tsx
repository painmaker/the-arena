import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  ability: AbilityEntityIndex,
}

const ManaCost = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - ManaCost rendered");

  const { ability } = props;

  const [manaCost, setManaCost] = useState(0);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setManaCost(Abilities.GetManaCost(ability));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => cancelSchedule(schedule, ManaCost.name, true);
  }, [ability, setInterval, clearInterval])

  if (manaCost === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Label style={Styles.Label()} text={manaCost} />
    </Panel>
  );

};

export default React.memo(ManaCost);
