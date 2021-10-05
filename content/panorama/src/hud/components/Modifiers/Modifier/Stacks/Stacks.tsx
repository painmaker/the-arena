import React, { useEffect, useState } from "react"
import { SCHEDULE_THINK_FAST } from "../../../../App"
import { Styles } from "./Styles"

type Props = {
  unit: EntityIndex,
  buff: BuffID,
}

const Stacks = (props: Props) => {

  $.Msg("REACT-RENDER: Modifier rendered");

  const { unit, buff } = props;

  const [stacks, setStacks] = useState(Buffs.GetStackCount(unit, buff))

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setStacks(Buffs.GetStackCount(unit, buff));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    }
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
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