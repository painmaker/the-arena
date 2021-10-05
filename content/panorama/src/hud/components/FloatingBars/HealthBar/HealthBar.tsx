import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../App";
import { Styles } from "./Styles";

type Props = {
  unit: EntityIndex,
};

const HealthBar = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingBars - HealthBar rendered");

  const { unit } = props;

  const [health, setHealth] = useState(Entities.GetHealth(unit));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(unit));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setHealth(Entities.GetHealth(unit));
      setMaxHealth(Entities.GetMaxHealth(unit));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [unit]);

  return (
    <Panel hittest={false} style={Styles.Container()}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className={Entities.IsEnemy(unit) ? 'healthProgressBarEnemy' : 'healthProgressBar'}
        style={Styles.Progressbar()}
      />
    </Panel>
  );

}

export default React.memo(HealthBar);