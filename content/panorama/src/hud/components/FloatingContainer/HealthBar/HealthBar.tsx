import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './styles.module.css';

type Props = {
  unit: EntityIndex,
};

const HealthBar = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingBars - HealthBar rendered");

  const { unit } = props;

  const [health, setHealth] = useState(Entities.GetHealth(unit));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(unit));

  useInterval(() => {
    setHealth(Entities.GetHealth(unit));
    setMaxHealth(Entities.GetMaxHealth(unit));
  }, HUD_THINK_FAST);

  return (
    <Panel hittest={false} className={Styles.container}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className={Entities.IsEnemy(unit) ? 'healthProgressBarEnemy' : 'healthProgressBar'}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "0px",
        }}
      />
    </Panel>
  );

}

export default React.memo(HealthBar);