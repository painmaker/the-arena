import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  ability: AbilityEntityIndex
}

const Skillpoints = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Skillpoints rendered");

  const { ability } = props;

  const [abilityLevel, setAbilityLevel] = useState(Abilities.GetLevel(ability));
  const [maxAbilityLevel, setMaxAbilityLevel] = useState(Abilities.GetMaxLevel(ability));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
      setAbilityLevel(Abilities.GetLevel(ability));
      setMaxAbilityLevel(Abilities.GetMaxLevel(ability));
    };
    update();
    return () => cancelSchedule(schedule, Skillpoints.name);
  }, [ability]);

  return (
    <Panel style={Styles.Container()}>
      {Array.from({ length: maxAbilityLevel }, (_, index) => index + 1).map(index => {
        const columnWidth = 100 / maxAbilityLevel;
        return (
          <Panel
            key={ability + '_level_' + index}
            style={Styles.Column(columnWidth)}
          >
            <Panel style={Styles.Skillpoint(abilityLevel, index)} />
          </Panel>
        )
      })}
    </Panel>
  );

};

export default React.memo(Skillpoints);
