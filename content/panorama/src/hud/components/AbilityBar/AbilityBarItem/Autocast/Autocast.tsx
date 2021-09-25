import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  enabled: boolean,
}

const Autocast = (props: Props) => {

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
