import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

type Props = {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
}

const Keybind = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Keybind rendered");

  const { ability, selectedUnit } = props;

  const [keybind, setKeybind] = useState<string>('');

  useInterval(() => {
    const isUpgradeable = Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
    const isControllable = Entities.IsControllableByPlayer(selectedUnit, Players.GetLocalPlayer());
    const hasAbilityPoints = Entities.GetAbilityPoints(selectedUnit) > 0;
    const isInLearningMode = Game.IsInAbilityLearnMode();
    const isTrainable = isInLearningMode && isUpgradeable && isControllable && hasAbilityPoints;
    const isPassive = Abilities.IsPassive(ability);
    const hasKeybind = isControllable && (!isPassive || isTrainable);
    setKeybind(hasKeybind ? Abilities.GetKeybind(ability) : '');
  }, HUD_THINK_FAST);

  return (
    <Panel className={Styles.container}>
      <Label
        className={Styles.label}
        text={keybind}
      />
    </Panel>
  );

};

export default React.memo(Keybind);
