import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  abilityEntityIndex: AbilityEntityIndex
}

const LevelUpButton = (props: Props) => {

  return (
    <Panel style={Styles.Container()}>
      <DOTAScenePanel
        map={'scenes/hud/levelupburst'}
        style={Styles.ParticleScene()}
      />
      <Panel
        onactivate={() => Abilities.AttemptToUpgrade(props.abilityEntityIndex)}
        style={Styles.ButtonBackground()}
      >
        <Panel style={Styles.LockIcon()} />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(LevelUpButton);
