import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../App";
import { cancelSchedule } from "../../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  selectedUnit: EntityIndex,
}

const Level = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - Level rendered");

  const { selectedUnit } = props;

  const [level, setLevel] = useState(Entities.GetLevel(selectedUnit));
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
      if (Entities.IsHero(selectedUnit)) {
        const currentXp = Entities.GetCurrentXP(selectedUnit);
        const requiredXp = Entities.GetNeededXPToLevel(selectedUnit);
        const degree = Math.floor(Math.max(0, Math.min(360, currentXp / requiredXp * 360)));
        setDegree(Number.isNaN(degree) ? 360 : degree);
      } else {
        setDegree(360);
      }
      setLevel(Entities.GetLevel(selectedUnit));
    };
    schedule = $.Schedule(0, update);
    return () => cancelSchedule(schedule, Level.name);
  }, [selectedUnit]);

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.CircleContainer()}>
        <Panel style={Styles.CircleBackground()} />
        <Panel className={'EmptyCircle'} style={Styles.CircleForeground(degree)} />
        <Label style={Styles.CircleLevelLabel()} text={level} />
      </Panel>
      <Label style={Styles.LevelLabel()} text={'level'} />
    </Panel>
  );

};

export default React.memo(Level);
