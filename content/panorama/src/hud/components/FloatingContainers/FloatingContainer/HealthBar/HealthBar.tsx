import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

type Props = {
  entityIndex: EntityIndex,
};

const HealthBar = (props: Props) => {

  // $.Msg("REACT-RENDER: FloatingBars - HealthBar rendered");

  const { entityIndex } = props;

  const [health, setHealth] = useState(Entities.GetHealth(entityIndex));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(entityIndex));

  useInterval(() => {
    setHealth(Entities.GetHealth(entityIndex));
    setMaxHealth(Entities.GetMaxHealth(entityIndex));
  }, HUD_THINK_FAST);

  return (
    <Panel hittest={false} className={Styles.container}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className={Entities.IsEnemy(entityIndex) ? 'healthProgressBarEnemy' : 'healthProgressBar'}
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