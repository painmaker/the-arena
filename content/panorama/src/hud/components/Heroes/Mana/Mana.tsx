import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../App";
import { Styles } from "./Styles";

type Props = {
  hero: EntityIndex,
}

const Mana = (props: Props) => {

  // $.Msg("REACT-RENDER: Heroes - Mana rendered");

  const { hero } = props;

  const [mana, setMana] = useState(Entities.GetMana(hero));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(hero));

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setMana(Entities.GetMana(hero));
      setMaxMana(Entities.GetMaxMana(hero));
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [hero, setInterval, clearInterval]);

  return (
    <Panel style={Styles.Container()}>
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className='manaProgressBar'
        style={Styles.Progressbar()}
      />
    </Panel>
  );

};

export default React.memo(Mana);
