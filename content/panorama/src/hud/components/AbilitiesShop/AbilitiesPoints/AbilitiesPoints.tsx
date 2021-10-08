import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../App";
import { cancelSchedule } from "../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  selectedUnit: EntityIndex
  text: string,
}

const AbilitiesPoints = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilitiesShop - AbilitiesPoints rendered");

  const { selectedUnit, text } = props;

  const [abilityPoints, setAbilityPoints] = useState(Entities.GetAbilityPoints(selectedUnit));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
      setAbilityPoints(Entities.GetAbilityPoints(selectedUnit));
    };
    schedule = $.Schedule(0, update);
    return () => cancelSchedule(schedule, AbilitiesPoints.name);
  }, [selectedUnit]);

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.LabelContainer()}>
        <Label
          text={text}
          style={Styles.TextLabel()}
        />
        <Label
          text={abilityPoints}
          style={Styles.NumberLabel(abilityPoints !== 0)}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(AbilitiesPoints);
