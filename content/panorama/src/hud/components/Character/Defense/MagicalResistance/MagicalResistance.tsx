import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../../App";
import { Styles as ParentStyles } from "../Styles";

type Props = {
  selectedUnit: EntityIndex,
};

const MagicalResistance = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - MagicalResistance rendered");

  const { selectedUnit } = props;

  const [resistance, setResistance] = useState(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL))

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setResistance(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL));
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [selectedUnit]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label
          text={'Magical Resistance:'}
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

export default React.memo(MagicalResistance);
