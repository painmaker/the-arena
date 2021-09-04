import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  entIndex: EntityIndex,
}

const Health = (props: Props) => {

  const [health, setHealth] = useState(Entities.GetHealth(props.entIndex));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(props.entIndex));

  useEffect(() => {
    const id = props.setInterval(() => {
      setHealth(Entities.GetHealth(props.entIndex));
      setMaxHealth(Entities.GetMaxHealth(props.entIndex));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel hittest={false} style={Styles.Container()}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className='healthProgressBar'
        style={Styles.Progressbar()}
      >
        <DOTAScenePanel
          style={Styles.Scene(health, maxHealth)}
          map={'scenes/hud/healthbarburner'}
          camera={'camera_1'}
        />
      </ProgressBar>
    </Panel>
  );

};

export default withReactTimeout(Health);
