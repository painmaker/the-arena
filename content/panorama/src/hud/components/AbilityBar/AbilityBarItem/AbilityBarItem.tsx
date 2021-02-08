import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
  unit: EntityIndex,
  isInLearningMode: boolean
}

function getBorder(isTrainable: boolean, isAutoCastEnabled: boolean, isToggled: boolean): string {
  if (isTrainable) {
    return '2px solid rgba(255, 165, 25, 0.9)';
  }
  if (isAutoCastEnabled || isToggled) {
    return '2px solid rgba(165, 75, 0, 0.5)';
  }
  return '1px solid rgba(25, 25, 25, 0.9)'
}

const getWashColor = (level: number, isTrainable: boolean, hasEnoughMana: boolean): string => {
  if (isTrainable) {
    return 'none';
  }
  if (level === 0) {
    return '#303030';
  }
  if (!hasEnoughMana) {
    return '#1569be';
  }
  return 'none';

}

const getSaturation = (level: number, isTrainable: boolean, hasEnoughMana: boolean): string => {
  if (isTrainable) {
    return '1.0';
  }
  if (level === 0) {
    return '0.0';
  }
  if (!hasEnoughMana) {
    return '0.0';
  }
  return '1.0';
}

const AbilityBarItem = (props: Props) => {

  const [level, setLevel] = useState(Abilities.GetLevel(props.ability));
  const [manaCost, setManaCost] = useState(Abilities.GetManaCost(props.ability));
  const [unitMana, setUnitMana] = useState(Entities.GetMana(props.unit));
  const [keybind, setKeybind] = useState(Abilities.GetKeybind(props.ability));
  const [isPassive, setIsPassive] = useState(Abilities.IsPassive(props.ability));
  const [isUpgradeable, setIsUpgradeable] = useState(false);
  const [isControllable, setIsControllable] = useState(false);
  const [isAutoCastEnabled, setIsAutoCastEnabled] = useState(Abilities.GetAutoCastState(props.ability));
  const [isToggled, setIsToggled] = useState(Abilities.GetToggleState(props.ability));
  const [totalCooldown, setTotalCooldown] = useState(Abilities.GetCooldownLength(props.ability));
  const [remainingCooldown, setRemainingCooldown] = useState(Abilities.GetCooldownTimeRemaining(props.ability));

  useEffect(() => {
    props.setInterval(() => {
      setLevel(Abilities.GetLevel(props.ability));
      setManaCost(Abilities.GetManaCost(props.ability));
      setUnitMana(Entities.GetMana(props.unit));
      setKeybind(Abilities.GetKeybind(props.ability));
      setIsPassive(Abilities.IsPassive(props.ability));
      setIsControllable(Entities.IsControllableByPlayer(props.unit, Players.GetLocalPlayer()));
      setIsUpgradeable(Abilities.CanAbilityBeUpgraded(props.ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED);
      setIsAutoCastEnabled(Abilities.GetAutoCastState(props.ability));
      setIsToggled(Abilities.GetToggleState(props.ability));
      setTotalCooldown(Abilities.GetCooldownLength(props.ability));
      setRemainingCooldown(Abilities.GetCooldownTimeRemaining(props.ability));
    }, 100)
  }, [props.isInLearningMode]);

  const isTrainable = props.isInLearningMode && isUpgradeable && isControllable;
  const hasEnoughMana = unitMana > manaCost;
  const cooldownPercent = Math.min(Math.round(100 * remainingCooldown / totalCooldown), 100);

  // Abilities.CanLearn( integer nEntityIndex )	TODO : Check if you can use this instead 

  return (
    <Panel
      hittest={true}
      className={'abilityBarItemContainer'}
      id={'ability_' + props.ability}
      onactivate={() => {
        if (props.isInLearningMode) {
          Abilities.AttemptToUpgrade(props.ability);
          return;
        }
        Abilities.ExecuteAbility(props.ability, props.unit, false);
      }}
      oncontextmenu={() => {
        if (props.isInLearningMode) {
          return;
        }
        if (Abilities.IsAutocast(props.ability)) {
          Game.PrepareUnitOrders({
            OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO,
            AbilityIndex: props.ability
          });
        }
      }}
      onmouseover={() => $.DispatchEvent(
        "DOTAShowAbilityTooltipForEntityIndex",
        $("#ability_" + props.ability),
        Abilities.GetAbilityName(props.ability),
        props.unit
      )}
      onmouseout={() => $.DispatchEvent(
        "DOTAHideAbilityTooltip",
        $("#ability_" + props.ability)
      )}
    >
      <DOTAAbilityImage
        style={{
          border: getBorder(isTrainable, isAutoCastEnabled, isToggled),
          washColor: getWashColor(level, isTrainable, hasEnoughMana),
          saturation: getSaturation(level, isTrainable, hasEnoughMana),
        }}
        contextEntityIndex={props.ability}
      />
      { (isTrainable || !isPassive) && (
        <Label
          className={'abilityBarItemKeybindLabel'}
          text={keybind}
        />
      )}
      { (manaCost !== 0) && (
        <Label
          className={'abilityBarItemManacostLabel'}
          text={manaCost}
        />
      )}
      { cooldownPercent > 0 && (
        <Panel className={'abilityBarItemCooldownContainer'}>
          <Panel
            className={'abilityBarItemCooldownOverlay'}
            style={{
              width: cooldownPercent + "%",
              margin: isTrainable ? '2px' : '0px'
            }}
          />
          <Label
            className={'abilityBarItemCooldownLabel'}
            text={Math.round(remainingCooldown)}
          />
        </Panel>
      )}
    </Panel>
  );

};

export default withReactTimeout(AbilityBarItem);


