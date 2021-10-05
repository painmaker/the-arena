import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
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
      setKeybind(Abilities.IsPassive(item) ? '' : Abilities.GetKeybind(item));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [item]);

  return (
    <Label
      style={Styles.Label()}
      text={keybind}
    />
  );

};

export default React.memo(Keybind);
