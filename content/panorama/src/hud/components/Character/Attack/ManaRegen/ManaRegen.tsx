import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles as ParentStyles } from "../Styles";

type Props = {
  selectedUnit: EntityIndex,
};

const ManaRegen = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - ManaRegen rendered");

  const { selectedUnit } = props;

  const [manaRegen, setManaRegen] = useState(Entities.GetManaThinkRegen(selectedUnit))

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update)
      setManaRegen(Entities.GetManaThinkRegen(selectedUnit));
    };
    update();
    return () => cancelSchedule(schedule, ManaRegen.name);
  }, [selectedUnit]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Mana Regeneration:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={manaRegen.toFixed(2)}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(ManaRegen);
