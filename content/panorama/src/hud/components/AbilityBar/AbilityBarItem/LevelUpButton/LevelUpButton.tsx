import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex
}

const LevelUpButton = (props: Props) => {

  $.Msg("REACT-RENDER: AbilityBarItem - LevelUpButton rendered");

  const { ability } = props;

  return (
    <Panel style={Styles.Container()}>
      <DOTAScenePanel
        map={'scenes/hud/levelupburst'}
        style={Styles.ParticleScene()}
      />
      <Panel
        onactivate={() => Abilities.AttemptToUpgrade(ability)}
        style={Styles.ButtonBackground()}
      >
        <Panel style={Styles.LockIcon()} />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(LevelUpButton);
