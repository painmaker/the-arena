import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_FAST } from "../../../App";

type Props = ReactTimeoutProps & {
  unit: EntityIndex,
};

const HealthBar = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingBars - HealthBar rendered");

  const { unit, setInterval, clearInterval } = props;

  const [health, setHealth] = useState(Entities.GetHealth(unit));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(unit));

  useEffect(() => {
    const update = () => {
      setHealth(Entities.GetHealth(unit));
      setMaxHealth(Entities.GetMaxHealth(unit));
    };
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [unit, setInterval, clearInterval]);

  return (
    <Panel hittest={false} style={Styles.Container()}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className={Entities.IsEnemy(unit) ? 'healthProgressBarEnemy' : 'healthProgressBar'}
        style={Styles.Progressbar()}
      />
    </Panel>
  );

}

export default React.memo(ReactTimeout(HealthBar));