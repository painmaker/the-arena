import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from "./styles.module.css";

type Props = {
  hero: EntityIndex,
}

const Mana = (props: Props) => {

  // $.Msg("REACT-RENDER: Heroes - Mana rendered");

  const { hero } = props;

  const [mana, setMana] = useState(Entities.GetMana(hero));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(hero));

  useInterval(() => {
    setMana(Entities.GetMana(hero));
    setMaxMana(Entities.GetMaxMana(hero));
  }, HUD_THINK_FAST);

  return (
    <Panel className={Styles.container}>
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className='manaProgressBar'
        style={{
          width: "100%",
          height: "6px",
          borderRadius: "0px",
          horizontalAlign: "center",
        }}
      />
    </Panel>
  );

};

export default React.memo(Mana);
