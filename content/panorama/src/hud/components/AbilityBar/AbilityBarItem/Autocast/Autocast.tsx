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

  const [show, setShow] = useState(false);

  useInterval(() => {
    setShow(Abilities.GetAutoCastState(ability) || Abilities.GetToggleState(ability));
  }, HUD_THINK_FAST);

  if (!show) {
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
