import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  abilityEntityIndex: AbilityEntityIndex,
  enabled: boolean,
}

const Autocast = (props: Props) => {
  return (
    <Panel style={Styles.Container()}>
      {props.enabled && (
        <DOTAScenePanel
          map={'scenes/hud/autocasting'}
          style={Styles.AutocastScene()}
        />
      )}
    </Panel>
  );
};

export default withReactTimeout(Autocast);
