import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  hero: EntityIndex,
}

const Health = (props: Props) => {

  $.Msg("REACT-RENDER: Heroes - Health rendered");

  const { hero, setInterval, clearInterval } = props;

  const [health, setHealth] = useState(Entities.GetHealth(hero));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(hero));

  useEffect(() => {

    const update = () => {
      setHealth(Entities.GetHealth(hero));
      setMaxHealth(Entities.GetMaxHealth(hero));
    };

    // update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [hero, setInterval, clearInterval]);

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
