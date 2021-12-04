import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

type Props = {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
}

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


const Image = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - AbilityImage rendered");

  const { ability, selectedUnit } = props;

  const [saturation, setSaturation] = useState('1.0');
  const [washColor, setWashColor] = useState('#303030');

  useInterval(() => {
    const level = Abilities.GetLevel(ability);
    const unitMana = Entities.GetMana(selectedUnit);
    const manaCost = Abilities.GetManaCost(ability);
    const cooldownRemaining = Abilities.GetCooldownTimeRemaining(ability);
    const isUpgradeable = Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
    const isControllable = Entities.IsControllableByPlayer(selectedUnit, Players.GetLocalPlayer());
    const hasAbilityPoints = Entities.GetAbilityPoints(selectedUnit) > 0;
    const isInLearningMode = Game.IsInAbilityLearnMode();
    const isTrainable = isInLearningMode && isUpgradeable && isControllable && hasAbilityPoints;
    setSaturation(getSaturation(isTrainable, level, manaCost, unitMana));
    setWashColor(getWashColor(isTrainable, manaCost, unitMana, cooldownRemaining, level));
  }, HUD_THINK_FAST);

  return (
    <Panel className={Styles.container}>
      <DOTAAbilityImage
        className={Styles.image}
        style={{
          washColor: washColor,
          saturation: saturation,
        }}
        contextEntityIndex={ability}
      />
    </Panel>
  );

};

export default React.memo(Image);
