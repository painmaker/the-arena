import React, { useState } from "react";
import { Styles } from "./Styles";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";

type Props = {
  ability: AbilityEntityIndex,
}

const Autocast = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Autocast rendered");

  const { ability } = props;

  const [isAutocastEnabled, setIsAutocastEnabled] = useState(false);

  useInterval(() => {
    setIsAutocastEnabled(Abilities.GetAutoCastState(ability));
  }, HUD_THINK_FAST);

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

export default React.memo(Autocast);
