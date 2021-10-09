import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_FAST } from "../../../App";

type Props = ReactTimeoutProps & {
  unit: EntityIndex,
};

const ManaBar = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingBars - ManaBar rendered");

  const { unit, setInterval, clearInterval } = props;

  const [mana, setMana] = useState(Entities.GetMana(unit));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(unit));

  useEffect(() => {
    const update = () => {
      setMana(Entities.GetMana(unit));
      setMaxMana(Entities.GetMaxMana(unit));
    };
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [unit, setInterval, clearInterval]);

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

export default React.memo(ReactTimeout(ManaBar));