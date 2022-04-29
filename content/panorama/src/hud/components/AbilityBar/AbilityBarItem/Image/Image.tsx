import React, { useContext, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import AbilityEntityIndexContext from "../../../../context/AbilityEntityIndexContext";
import SelectedEntityIndexContext from "../../../../context/SelectedEntityIndexContext";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

const getSaturation = (isTrainable: boolean, level: number, manaCost: number, unitMana: number): string => {
  if (isTrainable) {
    return '1.0';
  }
  if (level === 0) {
    return '0.0';
  }
  if (manaCost > unitMana) {
    return '0.0';
  }
  return '1.0';
}

const getWashColor = (isTrainable: boolean, manaCost: number, unitMana: number, cooldownTimeRemaining: number, level: number): string => {
  if (isTrainable) {
    return 'none';
  }
  if (manaCost > unitMana) {
    return '#1569be';
  }
  if (cooldownTimeRemaining > 0) {
    return 'rgba(0, 0, 0, 0.4)'
  }
  if (level === 0) {
    return '#303030';
  }
  return 'none';
}

const Image = () => {

  // $.Msg("REACT-RENDER: AbilityBarItem - AbilityImage rendered");

  const { abilityEntityIndex } = useContext(AbilityEntityIndexContext);
  const { selectedEntityIndex } = useContext(SelectedEntityIndexContext);

  const [saturation, setSaturation] = useState('1.0');
  const [washColor, setWashColor] = useState('#303030');
  const [isActive, setIsActive] = useState(false);

  useInterval(() => {
    const level = Abilities.GetLevel(abilityEntityIndex);
    const unitMana = Entities.GetMana(selectedEntityIndex);
    const manaCost = Abilities.GetManaCost(abilityEntityIndex);
    const cooldownRemaining = Abilities.GetCooldownTimeRemaining(abilityEntityIndex);
    const isUpgradeable = Abilities.CanAbilityBeUpgraded(abilityEntityIndex) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
    const isControllable = Entities.IsControllableByPlayer(selectedEntityIndex, Players.GetLocalPlayer());
    const hasAbilityPoints = Entities.GetAbilityPoints(selectedEntityIndex) > 0;
    const isInLearningMode = Game.IsInAbilityLearnMode();
    const isTrainable = isInLearningMode && isUpgradeable && isControllable && hasAbilityPoints;
    setSaturation(getSaturation(isTrainable, level, manaCost, unitMana));
    setWashColor(getWashColor(isTrainable, manaCost, unitMana, cooldownRemaining, level));
    setIsActive(Abilities.GetLocalPlayerActiveAbility() === abilityEntityIndex);
  }, HUD_THINK_FAST);

  return (
    <Panel
      className={Styles.container}
      style={{ border: isActive ? '1px solid rgba(0, 0, 0, 1)' : '0px solid rgba(0, 0, 0, 0.0)' }}
    >
      <DOTAAbilityImage
        scaling={'stretch'}
        className={Styles.image}
        style={{ washColor, saturation }}
        contextEntityIndex={abilityEntityIndex}
      />
    </Panel>
  );

};

export default React.memo(Image);
