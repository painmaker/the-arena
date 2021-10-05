import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { Styles } from "./Styles";

type Props = {
  ability: AbilityEntityIndex,
}

const Autocast = (props: Props) => {

  $.Msg("REACT-RENDER: AbilityBarItem - Autocast rendered");

  const { ability } = props;

  const [isAutocastEnabled, setIsAutocastEnabled] = useState(false);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setIsAutocastEnabled(Abilities.GetAutoCastState(ability));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [ability]);

  if (!isAutocastEnabled) {
    return null;
  }

  return (
    <React.Fragment>
      <Panel style={Styles.Container()}>
        <DOTAScenePanel
          map={'scenes/hud/autocasting'}
          style={Styles.AutocastScene()}
        />
      </Panel>
    </React.Fragment>
  );

};

export default React.memo(Autocast);
