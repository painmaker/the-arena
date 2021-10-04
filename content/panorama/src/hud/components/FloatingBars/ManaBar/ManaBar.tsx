import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../App";
import { Styles } from "./Styles";

type Props = {
  unit: EntityIndex,
};

const ManaBar = (props: Props) => {

  $.Msg("REACT-RENDER: FloatingBars - ManaBar rendered");

  const { unit } = props;

  const [mana, setMana] = useState(Entities.GetMana(unit));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(unit));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setMana(Entities.GetMana(unit));
      setMaxMana(Entities.GetMaxMana(unit));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [unit]);

  return (
    <Panel hittest={false} style={Styles.Container(maxMana > 0)}>
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className={'manaProgressBar'}
        style={Styles.Progressbar()}
      />
    </Panel>
  );

}

export default React.memo(ManaBar);