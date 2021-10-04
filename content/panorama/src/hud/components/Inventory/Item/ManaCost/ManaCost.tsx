import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { Styles } from "./Styles";

type Props = {
  item: ItemEntityIndex,
};

const ManaCost = (props: Props) => {

  $.Msg("REACT-RENDER: Inventory - ManaCost rendered");

  const { item } = props;

  const [manaCost, setManaCost] = useState(Abilities.GetManaCost(item));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setManaCost(Abilities.GetManaCost(item));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [item]);

  return (
    <Label
      style={Styles.Label()}
      text={manaCost > 0 ? manaCost.toFixed(0) : ''}
    />
  );

};

export default React.memo(ManaCost);
