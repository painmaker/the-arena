import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../../App";
import { Styles as ParentStyles } from "../Styles";

type Props = {
  selectedUnit: EntityIndex,
};

const AttackSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - AttackRange rendered");

  const { selectedUnit } = props;

  const [attackRange, setAttackRange] = useState(Entities.GetAttackRange(selectedUnit))

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setAttackRange(Entities.GetAttackRange(selectedUnit));
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [selectedUnit]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Attack Range:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={attackRange.toFixed(0)}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(AttackSpeed);
