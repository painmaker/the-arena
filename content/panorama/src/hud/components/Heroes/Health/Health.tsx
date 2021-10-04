import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../App";
import { Styles } from "./Styles";

type Props = {
  hero: EntityIndex,
}

const Health = (props: Props) => {

  $.Msg("REACT-RENDER: Heroes - Health rendered");

  const { hero } = props;

  const [health, setHealth] = useState(Entities.GetHealth(hero));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(hero));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setHealth(Entities.GetHealth(hero));
      setMaxHealth(Entities.GetMaxHealth(hero));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [hero]);

  return (
    <Panel hittest={false} style={Styles.Container()}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className='healthProgressBar'
        style={Styles.Progressbar()}
      />
    </Panel>
  );

};

export default React.memo(Health);
