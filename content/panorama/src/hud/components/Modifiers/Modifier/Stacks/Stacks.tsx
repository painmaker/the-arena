import React, { useEffect, useState } from "react"
import { SCHEDULE_THINK_FAST } from "../../../../App"
import { cancelSchedule } from "../../../../utils/Schedule"
import { Styles } from "./Styles"

type Props = {
  unit: EntityIndex,
  buff: BuffID,
}

const Stacks = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifier rendered");

  const { unit, buff } = props;

  const [stacks, setStacks] = useState(Buffs.GetStackCount(unit, buff))

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
      setStacks(Buffs.GetStackCount(unit, buff));
    }
    update();
    return () => cancelSchedule(schedule, Stacks.name);
  }, [unit, buff]);

  if (stacks === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Label style={Styles.StackLabel()} text={stacks} />
    </Panel>
  );

}

export default React.memo(Stacks);