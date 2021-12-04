import React, { useState } from "react";
import Cooldown from "./Cooldown/Cooldown";
import Autocast from "./Autocast/Autocast";
import LockoutIcon from "./LockoutIcon/LockoutIcon";
import Skillpoints from "./Skillpoints/Skillpoints";
import ManaCost from "./ManaCost/ManaCost";
import Keybind from "./Keybind/Keybind";
import Image from "./Image/Image";
import LevelUpButton from "./LevelUpButton/LevelUpButton";
import CastPointOverlay from "./CastPointOverlay/CastPointOverlay";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './styles.module.css';

const onMouseOver = (ability: AbilityEntityIndex, selectedUnit: EntityIndex) => {
  $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", $("#ability_" + ability), Abilities.GetAbilityName(ability), selectedUnit);
}

const onMouseOut = (ability: AbilityEntityIndex) => {
  $.DispatchEvent("DOTAHideAbilityTooltip", $("#ability_" + ability));
}

const onLeftClick = (ability: AbilityEntityIndex, selectedUnit: EntityIndex) => {
  if (GameUI.IsAltDown()) {
    GameEvents.SendCustomGameEventToAllClients("on_ability_alerted", {
      broadcaster: Players.GetLocalPlayer(),
      selectedUnit,
      ability
    })
    return;
  }
  if (Game.IsInAbilityLearnMode()) {
    Abilities.AttemptToUpgrade(ability);
    return;
  }
  if (Entities.IsStunned(selectedUnit) || Entities.IsCommandRestricted(selectedUnit)) {
    Game.EmitSound("General.CastFail_Custom");
    return;
  }
  if (Entities.IsSilenced(selectedUnit)) {
    Game.EmitSound("General.CastFail_Silenced");
    return;
  }
  Abilities.ExecuteAbility(ability, selectedUnit, false);
}

const onRightClick = (ability: AbilityEntityIndex) => {
  if (Game.IsInAbilityLearnMode()) {
    return;
  }
  if (Abilities.IsAutocast(ability)) {
    Game.PrepareUnitOrders({
      OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO,
      AbilityIndex: ability
    });
  }
}

const getContainerBackgroundImage = (isTrainable: boolean, isPassive: boolean, isActive: boolean, isAutoCastEnabled: boolean, isToggled: boolean): string => {
  if (isTrainable) {
    return 'url("s2r://panorama/images/hud/reborn/levelup_button_learnmode_psd.vtex")';
  }
  if (isPassive) {
    return 'url("s2r://panorama/images/hud/passive_ability_border_png.vtex")';
  }
  if (isActive) {
    return 'url("s2r://panorama/images/hud/reborn/active_ability_border_psd.vtex")';
  }
  if (isAutoCastEnabled || isToggled) {
    return 'url("s2r://panorama/images/hud/reborn/autocastable_ability_border_psd.vtex")'
  }
  return 'none'
}


type Props = {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
}

const AbilityBarItem = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBar - AbilityBarItem rendered");

  const { ability, selectedUnit } = props;

  const [isPassive, setIsPassive] = useState(false);
  const [isAutoCastEnabled, setIsAutoCastEnabled] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isTrainable, setIsTrainable] = useState(false);
  const [isInAbilityPhase, setIsInAbilityPhase] = useState(false);
  const [castPoint, setCastPoint] = useState(Math.max(0.1, Abilities.GetCastPoint(ability) - 0.1));

  useInterval(() => {
    const isUpgradeable = Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
    const isControllable = Entities.IsControllableByPlayer(selectedUnit, Players.GetLocalPlayer());
    const hasAbilityPoints = Entities.GetAbilityPoints(selectedUnit) > 0;
    const isInLearningMode = Game.IsInAbilityLearnMode();
    setIsTrainable(isInLearningMode && isUpgradeable && isControllable && hasAbilityPoints);
    setIsPassive(Abilities.IsPassive(ability));
    setIsAutoCastEnabled(Abilities.GetAutoCastState(ability))
    setIsToggled(Abilities.GetToggleState(ability))
    setIsActive(Abilities.GetLocalPlayerActiveAbility() === ability);
    setIsInAbilityPhase(Abilities.IsInAbilityPhase(ability));
    setCastPoint(Math.max(0.1, Abilities.GetCastPoint(ability) - 0.1));
  }, HUD_THINK_FAST);

  return (
    <Panel className={Styles.container} id={'ability_' + ability} >
      <Panel className={Styles.levelUpButtonContainer}>
        <LevelUpButton ability={ability} selectedUnit={selectedUnit} />
      </Panel>
      <Panel
        hittest={true}
        onactivate={() => onLeftClick(ability, selectedUnit)}
        oncontextmenu={() => onRightClick(ability)}
        onmouseover={() => onMouseOver(ability, selectedUnit)}
        onmouseout={() => onMouseOut(ability)}
        className={Styles.abilityContainer}
        style={{
          backgroundColor: isActive ? '#a0a0a0' : "rgba(0, 0, 0, 0.7)",
          backgroundImage: getContainerBackgroundImage(isTrainable, isPassive, isActive, isAutoCastEnabled, isToggled),
          padding: isTrainable ? '4px' : isActive || isAutoCastEnabled || isToggled ? '2px' : '1px',
        }}
      >
        <Image ability={ability} selectedUnit={selectedUnit} />
        <Keybind ability={ability} selectedUnit={selectedUnit} />
        <ManaCost ability={ability} />
        <Cooldown ability={ability} />
        <Autocast ability={ability} />
        <LockoutIcon ability={ability} selectedUnit={selectedUnit} />
        {isInAbilityPhase && (
          <CastPointOverlay
            castPoint={castPoint}
            endTime={Game.GetGameTime() + castPoint}
          />
        )}
      </Panel>
      <Skillpoints ability={ability} />
    </Panel>
  );

};

export default React.memo(AbilityBarItem);


