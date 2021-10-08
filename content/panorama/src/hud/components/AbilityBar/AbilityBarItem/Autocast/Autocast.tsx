import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  ability: AbilityEntityIndex,
}

const Autocast = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Autocast rendered");

  const { ability } = props;

  const [isAutocastEnabled, setIsAutocastEnabled] = useState(false);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
      setIsAutocastEnabled(Abilities.GetAutoCastState(ability));
    };
    update();
    return () => cancelSchedule(schedule, Autocast.name);
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
