import React, { useState } from "react";
import { Styles } from "./Styles";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";

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

export default React.memo(HealthBar);