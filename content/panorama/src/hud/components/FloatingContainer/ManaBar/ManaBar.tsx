import React, { useState } from "react";
import { Styles } from "./Styles";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";

type Props = {
  unit: EntityIndex,
};

const ManaBar = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingBars - ManaBar rendered");

  const { unit } = props;

  const [mana, setMana] = useState(Entities.GetMana(unit));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(unit));

  useInterval(() => {
    setMana(Entities.GetMana(unit));
    setMaxMana(Entities.GetMaxMana(unit));
  }, HUD_THINK_FAST);

  return (
    <Panel hittest={false} style={Styles.Container(maxMana > 0)}>
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className={'manaProgressBar'}
        style={Styles.Progressbar()}
      />
    </Panel>
  );

}

export default React.memo(ManaBar);