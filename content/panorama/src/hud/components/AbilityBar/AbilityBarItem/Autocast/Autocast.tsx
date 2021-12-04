import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

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
      <Panel className={Styles.container}>
        <DOTAScenePanel
          map={'scenes/hud/autocasting'}
          className={Styles.scene}
        />
      </Panel>
    </React.Fragment>
  );

};

export default React.memo(Autocast);
