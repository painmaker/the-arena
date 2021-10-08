import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles as ParentStyles } from "../Styles";

type Props = {
  selectedUnit: EntityIndex,
};

const PyshicalResistance = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - PhysicalResistance rendered");

  const { selectedUnit } = props;

  const [resistance, setResistance] = useState(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL))

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
      setResistance(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL));
    };
    schedule = $.Schedule(0, update);
    return () => cancelSchedule(schedule, PyshicalResistance.name);
  }, [selectedUnit]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label
          text={'Pyshical Resistance:'}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={(resistance * 100).toFixed(2) + " %"}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(PyshicalResistance);
