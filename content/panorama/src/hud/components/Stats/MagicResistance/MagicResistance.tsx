import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";
import { SCHEDULE_THINK_MEDIUM } from "../../../App";

type Props = {
  selectedUnit: EntityIndex,
};

const MagicResistance = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - MagicalResistance rendered");

  const { selectedUnit } = props;

  const [magicResistance, setMagicResistance] = useState(Entities.GetMagicalArmorValue(selectedUnit));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setMagicResistance(Entities.GetMagicalArmorValue(selectedUnit));
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
        text={(magicResistance * 100).toFixed(1) + "%"}
      />
    </Panel>
  );

};

export default React.memo(MagicResistance);
