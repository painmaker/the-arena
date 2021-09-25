import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  enabled: boolean,
}

const Autocast = (props: Props) => {

  $.Msg("REACT-RENDER: AbilityBarItem - Autocast rendered");

  const { enabled } = props;

  return (
    <Panel style={Styles.Container()}>
      {enabled && (
        <DOTAScenePanel
          map={'scenes/hud/autocasting'}
          style={Styles.AutocastScene()}
        />
      )}
    </Panel>
  );

};

export default withReactTimeout(Autocast);
