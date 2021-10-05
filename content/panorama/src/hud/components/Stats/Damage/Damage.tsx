import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";
import { SCHEDULE_THINK_MEDIUM, SCHEDULE_THINK_SLOW } from "../../../App";

type Props = {
  selectedUnit: EntityIndex,
}

const Damage = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - Damage rendered");

  const { selectedUnit } = props;

  const [minDamage, setMinDamage] = useState(Entities.GetDamageMin(selectedUnit));
  const [maxDamage, setMaxDamage] = useState(Entities.GetDamageMax(selectedUnit));
  const [bonusDamage, setBonusDamage] = useState(Entities.GetDamageBonus(selectedUnit));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setMinDamage(Entities.GetDamageMin(selectedUnit));
      setMaxDamage(Entities.GetDamageMax(selectedUnit));
      setBonusDamage(Entities.GetDamageBonus(selectedUnit));
      schedule = $.Schedule(SCHEDULE_THINK_SLOW, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [selectedUnit]);

  return (
    <Panel style={ParentStyles.Entry()}>
      <Panel style={Styles.Image()} />
      <Label
        style={ParentStyles.Label()}
        text={minDamage.toFixed(0) + "-" + maxDamage.toFixed(0)}
      />
      {bonusDamage !== 0 && (
        <Label
          style={{ color: bonusDamage > 0 ? 'rgba(0, 128, 0, 0.75)' : 'rgba(175, 0, 0, 0.75)' }}
          text={(bonusDamage > 0 ? '+' : '') + "(" + bonusDamage.toFixed(0) + ")"}
        />
      )}
    </Panel>
  );

};

export default React.memo(Damage);
