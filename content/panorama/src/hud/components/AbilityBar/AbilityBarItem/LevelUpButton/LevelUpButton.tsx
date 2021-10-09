import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_FAST } from "../../../../App";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex
}

const LevelUpButton = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - LevelUpButton rendered");

  const { ability, selectedUnit, setInterval, clearInterval } = props;

  const [isAbilityUpgradeable, setIsAbilityUpgradeable] = useState(false);

  useEffect(() => {
    const update = () => {
      const isUpgradeable = Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
      const isControllable = Entities.IsControllableByPlayer(selectedUnit, Players.GetLocalPlayer());
      const hasAbilityPoints = Entities.GetAbilityPoints(selectedUnit) > 0;
      const isAbilityUpgradeable = isUpgradeable && isControllable && hasAbilityPoints;
      setIsAbilityUpgradeable(isAbilityUpgradeable);
    };
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [ability, selectedUnit, setInterval, clearInterval])

  if (!isAbilityUpgradeable) {
    return null;
  }

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

export default React.memo(ReactTimeout(LevelUpButton));
