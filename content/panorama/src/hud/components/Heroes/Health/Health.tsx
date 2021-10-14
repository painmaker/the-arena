import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import { Styles } from "./Styles";

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

export default React.memo(Health);
