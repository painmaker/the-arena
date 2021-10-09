import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../App";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  hero: EntityIndex,
}

const Health = (props: Props) => {

  // $.Msg("REACT-RENDER: Heroes - Health rendered");

  const { hero, setInterval, clearInterval } = props;

  const [health, setHealth] = useState(Entities.GetHealth(hero));
  const [maxHealth, setMaxHealth] = useState(Entities.GetMaxHealth(hero));

  useEffect(() => {
    const update = () => {
      setHealth(Entities.GetHealth(hero));
      setMaxHealth(Entities.GetMaxHealth(hero));
    };
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [hero, setInterval, clearInterval]);

  return (
    <Panel hittest={false} style={Styles.Container()}>
      <ProgressBar
        min={0}
        max={maxHealth}
        value={health}
        className='healthProgressBar'
        style={Styles.Progressbar()}
      />
    </Panel>
  );

};

export default React.memo(ReactTimeout(Health));
