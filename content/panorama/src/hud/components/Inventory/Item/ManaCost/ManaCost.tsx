import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  item: ItemEntityIndex,
};

const ManaCost = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - ManaCost rendered");

  const { item } = props;

  const [manaCost, setManaCost] = useState(Abilities.GetManaCost(item));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
      setManaCost(Abilities.GetManaCost(item));
    };
    schedule = $.Schedule(0, update);
    return () => cancelSchedule(schedule, ManaCost.name);
  }, [item]);

  return (
    <Label
      style={Styles.Label()}
      text={manaCost > 0 ? manaCost.toFixed(0) : ''}
    />
  );

};

export default React.memo(ManaCost);
