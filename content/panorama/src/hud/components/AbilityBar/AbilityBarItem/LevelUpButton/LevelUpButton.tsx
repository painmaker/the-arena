import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

type Props = {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex
}

const LevelUpButton = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - LevelUpButton rendered");

  const { ability, selectedUnit } = props;

  const [isAbilityUpgradeable, setIsAbilityUpgradeable] = useState(false);

  useInterval(() => {
    const isUpgradeable = Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
    const isControllable = Entities.IsControllableByPlayer(selectedUnit, Players.GetLocalPlayer());
    const hasAbilityPoints = Entities.GetAbilityPoints(selectedUnit) > 0;
    const isAbilityUpgradeable = isUpgradeable && isControllable && hasAbilityPoints;
    setIsAbilityUpgradeable(isAbilityUpgradeable);
  }, HUD_THINK_FAST);

  if (!isAbilityUpgradeable) {
    return null;
  }

  return (
    <Panel className={Styles.container}>
      <DOTAScenePanel
        map={'scenes/hud/levelupburst'}
        className={Styles.particleScene}
      />
      <Panel
        onactivate={() => Abilities.AttemptToUpgrade(ability)}
        className={Styles.buttonBackground}
      >
        <Panel className={Styles.icon} />
      </Panel>
    </Panel>
  );

};

export default React.memo(LevelUpButton);
