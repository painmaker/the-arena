import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../App";
import { cancelSchedule } from "../../utils/Schedule";
import { Styles } from "./Styles";

type Props = {
  selectedUnit: EntityIndex,
};

const ManaBar = (props: Props) => {

  // $.Msg("REACT-RENDER: ManaBar rendered");

  const { selectedUnit } = props;

  const [mana, setMana] = useState(Entities.GetMana(selectedUnit));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(selectedUnit));
  const [manaRegen, setManaRegen] = useState(Entities.GetManaThinkRegen(selectedUnit));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      $.Msg("")
      $.Msg("Update 1 " + Entities.GetUnitName(selectedUnit));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
      setMana(Entities.GetMana(selectedUnit));
      setMaxMana(Entities.GetMaxMana(selectedUnit));
      setManaRegen(Entities.GetManaThinkRegen(selectedUnit));
      $.Msg("Update 2 " + Entities.GetUnitName(selectedUnit));
    };
    schedule = $.Schedule(0, update);
    return () => cancelSchedule(schedule, ManaBar.name);
  }, [selectedUnit]);

  return (
    <Panel hittest={false} style={Styles.Container(maxMana > 0)}>
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className={'manaProgressBar'}
        style={Styles.Progressbar()}
      >
        <DOTAScenePanel
          style={Styles.Scene(mana, maxMana)}
          map={'scenes/hud/healthbarburner'}
        />
      </ProgressBar>
      <Label
        style={Styles.ManaLabel()}
        text={mana + " / " + maxMana}
      />
      <Label
        style={Styles.RegenLabel()}
        text={'+ ' + manaRegen.toFixed(1)}
      />
    </Panel>
  );

};

export default React.memo(ManaBar);
