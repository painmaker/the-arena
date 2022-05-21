import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from "./styles.module.css";

type Props = {
  heroEntityIndex: EntityIndex,
}

const Health = (props: Props) => {

  // $.Msg("REACT-RENDER: Heroes - Health rendered");

  const { heroEntityIndex } = props;

  const [health, setHealth] = useState(Entities.GetHealth(heroEntityIndex));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(heroEntityIndex));

  useInterval(() => {
    setHealth(Entities.GetHealth(heroEntityIndex));
    setMaxHealth(Entities.GetMaxHealth(heroEntityIndex));
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
