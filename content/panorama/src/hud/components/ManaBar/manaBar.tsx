import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST, SCHEDULE_THINK_FAST } from "../../App";
import { cancelSchedule } from "../../utils/Schedule";
import { Styles } from "./Styles";
import ReactTimeout from 'react-timeout'

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
    const id = setInterval(() => {
      setMana(Entities.GetMana(selectedUnit));
      setMaxMana(Entities.GetMaxMana(selectedUnit));
      setManaRegen(Entities.GetManaThinkRegen(selectedUnit));
    }, HUD_THINK_FAST)
    return () => clearInterval!(id);
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

export default React.memo(ReactTimeout(ManaBar));
