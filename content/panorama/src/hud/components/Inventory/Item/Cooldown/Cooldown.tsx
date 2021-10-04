import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { Styles } from "./Styles";

type Props = {
  item: ItemEntityIndex
};

const Cooldown = (props: Props) => {

  $.Msg("REACT-RENDER: Inventory - Cooldown rendered");

  const { item } = props;

  const [totalCooldown, setTotalCooldown] = useState(Abilities.GetCooldownLength(item))
  const [remainingCooldown, setRemainingCooldown] = useState(Abilities.GetCooldownTimeRemaining(item))

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setTotalCooldown(Abilities.GetCooldownLength(item));
      setRemainingCooldown(Abilities.GetCooldownTimeRemaining(item));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [item]);

  let degree = Math.min(0, - (remainingCooldown / totalCooldown) * 360);
  if (Number.isNaN(degree) || !Number.isFinite(degree)) {
    degree = 0;
  }

  return (
    <React.Fragment>
      <Panel style={Styles.Container(degree)} />
      {remainingCooldown > 0 && (
        <Label
          style={Styles.Label()}
          text={remainingCooldown > 1.0 ? Math.round(remainingCooldown) : remainingCooldown.toFixed(1)}
        />
      )}
    </React.Fragment>
  );

};

export default React.memo(Cooldown);
