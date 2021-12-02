import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './styles.module.css';

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
    <Panel
      hittest={false}
      className={Styles.container}
      style={{ visibility: maxMana > 0 ? 'visible' : 'collapse' }}
    >
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className={'manaProgressBar'}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "0px",
        }}
      />
    </Panel>
  );

}

export default React.memo(ManaBar);