import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";
import { SCHEDULE_THINK_MEDIUM } from "../../../App";

type Props = {
  selectedUnit: EntityIndex
}

const Armor = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - Armor rendered");

  const { selectedUnit } = props;

  const [armor, setArmor] = useState(Entities.GetPhysicalArmorValue(selectedUnit));
  const [bonusArmor, setBonusArmor] = useState(Entities.GetBonusPhysicalArmor(selectedUnit));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setArmor(Entities.GetPhysicalArmorValue(selectedUnit));
      setBonusArmor(Entities.GetBonusPhysicalArmor(selectedUnit));
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [selectedUnit]);

  return (
    <Panel style={ParentStyles.Entry()}>
      <Panel style={Styles.Image()} />
      <Label
        style={ParentStyles.Label()}
        text={(armor - bonusArmor).toFixed(1)}
      />
      {bonusArmor !== 0 && (
        <Label
          style={{ color: bonusArmor > 0 ? 'rgba(0, 128, 0, 0.75)' : 'rgba(175, 0, 0, 0.75)' }}
          text={(bonusArmor > 0 ? "+" : "") + "(" + bonusArmor.toFixed(1) + ")"}
        />
      )}
    </Panel>
  );

};

export default React.memo(Armor);
