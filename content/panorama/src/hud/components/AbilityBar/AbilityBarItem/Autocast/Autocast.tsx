import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_FAST } from "../../../../App";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
}

const Autocast = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Autocast rendered");

  const { ability, setInterval, clearInterval } = props;

  const [isAutocastEnabled, setIsAutocastEnabled] = useState(false);

  useEffect(() => {
    const update = () => setIsAutocastEnabled(Abilities.GetAutoCastState(ability));
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [ability, setInterval, clearInterval]);

  if (!isAutocastEnabled) {
    return null;
  }

  return (
    <React.Fragment>
      <Panel style={Styles.Container()}>
        <DOTAScenePanel
          map={'scenes/hud/autocasting'}
          style={Styles.AutocastScene()}
        />
      </Panel>
    </React.Fragment>
  );

};

export default React.memo(ReactTimeout(Autocast));
