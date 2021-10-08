import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  item: ItemEntityIndex,
};

const Keybind = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Keybind rendered");

  const { item } = props;

  const [keybind, setKeybind] = useState('');

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
      setKeybind(Abilities.IsPassive(item) ? '' : Abilities.GetKeybind(item));
    };
    schedule = $.Schedule(0, update);
    return () => cancelSchedule(schedule, Keybind.name);
  }, [item]);

  return (
    <Label
      style={Styles.Label()}
      text={keybind}
    />
  );

};

export default React.memo(Keybind);
