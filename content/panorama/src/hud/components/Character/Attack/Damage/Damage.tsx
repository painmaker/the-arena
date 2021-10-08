import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../../App";
import { cancelSchedule } from "../../../../utils/Schedule";
import { Styles as ParentStyles } from "../Styles";

type Props = {
  selectedUnit: EntityIndex,
};

const Damage = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - Damage rendered");

  const { selectedUnit } = props;

  const [minDamage, setMinDamage] = useState(Entities.GetDamageMin(selectedUnit))
  const [maxDamage, setMaxDamage] = useState(Entities.GetDamageMax(selectedUnit))
  const [bonusDamage, setBonusDamage] = useState(Entities.GetDamageBonus(selectedUnit))

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update)
      setMinDamage(Entities.GetDamageMin(selectedUnit));
      setMaxDamage(Entities.GetDamageMax(selectedUnit));
      setBonusDamage(Entities.GetDamageBonus(selectedUnit));
    };
    update();
    return () => cancelSchedule(schedule, Damage.name);
  }, [selectedUnit]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Damage:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={minDamage.toFixed(0) + " - " + maxDamage.toFixed(0)}
          style={ParentStyles.ColumnLabel()}
        />
        {bonusDamage !== 0 && (
          <Label
            text={(bonusDamage > 0 ? ' + ' : ' - ') + Math.abs(bonusDamage)}
            style={{
              ...ParentStyles.ColumnLabel(),
              color: bonusDamage > 0 ? 'green' : 'red',
            }}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default React.memo(Damage);
