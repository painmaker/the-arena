import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from "./styles.module.css";

type Props = {
  hero: EntityIndex,
}

const Health = (props: Props) => {

  // $.Msg("REACT-RENDER: Heroes - Health rendered");

  const { hero } = props;

  const [health, setHealth] = useState(Entities.GetHealth(hero));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(hero));

  useInterval(() => {
    setHealth(Entities.GetHealth(hero));
    setMaxHealth(Entities.GetMaxHealth(hero));
  }, HUD_THINK_FAST);

  return (
    <Panel className={Styles.container}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className='healthProgressBar'
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

export default React.memo(Health);
