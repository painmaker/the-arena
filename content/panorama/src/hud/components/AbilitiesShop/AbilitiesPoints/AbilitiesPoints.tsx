import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../App";
import { Styles } from "./Styles";

type Props = {
  selectedUnit: EntityIndex
  text: string,
}

const AbilitiesPoints = (props: Props) => {

  $.Msg("REACT-RENDER: AbilitiesShop - AbilitiesPoints rendered");

  const { selectedUnit, text } = props;

  const [abilityPoints, setAbilityPoints] = useState(Entities.GetAbilityPoints(selectedUnit));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setAbilityPoints(Entities.GetAbilityPoints(selectedUnit));
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
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
