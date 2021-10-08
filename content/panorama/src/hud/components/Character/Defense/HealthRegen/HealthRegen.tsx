import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles as ParentStyles } from "../Styles";

type Props = {
  selectedUnit: EntityIndex,
};

const HealthRegen = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - HealthRegen rendered");

  const { selectedUnit } = props;

  const [regen, setRegen] = useState(0)
  const [baseRegen, setBaseRegen] = useState(0)

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
      // Hack because panorama API method for health regen is bugged
      const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
      for (let i = 0; i < numberOfBuffs; i++) {
        const buff = Entities.GetBuff(selectedUnit, i);
        const name = Buffs.GetName(selectedUnit, buff);
        if (name === 'modifier_ui_health_regen') {
          setRegen(Buffs.GetStackCount(selectedUnit, buff) / 100);
        }
        if (name === 'modifier_ui_base_health_regen') {
          setBaseRegen(Buffs.GetStackCount(selectedUnit, buff) / 100);
        }
      }
    };
    update();
    return () => cancelSchedule(schedule, HealthRegen.name);
  }, [selectedUnit]);

  const increasedRegen = regen - baseRegen;

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Health Regeneration:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={baseRegen.toFixed(2)}
          style={ParentStyles.ColumnLabel()}
        />
        {increasedRegen !== 0 && (
          <Label
            text={(increasedRegen > 0 ? ' + ' : ' - ') + Math.abs(increasedRegen).toFixed(2)}
            style={{
              ...ParentStyles.ColumnLabel(),
              color: increasedRegen > 0 ? 'green' : 'red',
            }}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default React.memo(HealthRegen);
