import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  ability: AbilityEntityIndex,
}

const Cooldown = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Cooldown rendered");

  const { ability } = props;

  const [degree, setDegree] = useState(0);
  const [cooldownTimeRemaining, setCooldownTimeRemaining] = useState(0);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
      const totalCooldown = Abilities.GetCooldown(ability);
      const cooldownTimeRemaining = Abilities.GetCooldownTimeRemaining(ability);
      const degree = Math.min(0, - (cooldownTimeRemaining / totalCooldown) * 360);
      if (Number.isNaN(degree) || !Number.isFinite(degree)) {
        setDegree(0)
      } else {
        setDegree(degree);
      }
      setCooldownTimeRemaining(cooldownTimeRemaining);
    };
    schedule = $.Schedule(0, update);
    return () => cancelSchedule(schedule, Cooldown.name);
  }, [ability]);

  if (cooldownTimeRemaining === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.Background(degree)} />
      <Label
        style={Styles.Label()}
        text={Math.ceil(cooldownTimeRemaining)}
      />
    </Panel>
  );

};

export default React.memo(Cooldown);
