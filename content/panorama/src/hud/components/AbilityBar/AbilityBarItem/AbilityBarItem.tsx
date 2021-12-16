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
import Shine from "./Shine/Shine";

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

const getContainerBackgroundImage = (isTrainable: boolean, isPassive: boolean): string => {
  if (isTrainable) {
    return 'url("s2r://panorama/images/ability_gold_background_dark_png.vtex")';
  }
  if (isPassive) {
    return 'url("s2r://panorama/images/hud/passive_ability_border_png.vtex")';
  }
  return 'url("s2r://panorama/images/hud/active_ability_border_png.vtex")';
}


type Props = {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
}

const AbilityBarItem = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBar - AbilityBarItem rendered");

  const { ability, selectedUnit } = props;

  const [isPassive, setIsPassive] = useState(Abilities.IsPassive(ability));
  const [isAutoCastEnabled, setIsAutoCastEnabled] = useState(Abilities.GetAutoCastState(ability));
  const [isToggled, setIsToggled] = useState(Abilities.GetToggleState(ability));
  const [isActive, setIsActive] = useState(Abilities.GetLocalPlayerActiveAbility() === ability);
  const [isTrainable, setIsTrainable] = useState(false);

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
  }, HUD_THINK_FAST);

  return (
    <Panel className={Styles.container} id={'ability_' + ability} >
      <LevelUpButton
        ability={ability}
        selectedUnit={selectedUnit}
      />
      <Panel
        onactivate={() => onLeftClick(ability, selectedUnit)}
        oncontextmenu={() => onRightClick(ability)}
        onmouseover={() => onMouseOver(ability, selectedUnit)}
        onmouseout={() => onMouseOut(ability)}
        className={Styles.background}
        style={{
          border: isTrainable ? '1px solid rgba(0, 0, 0, 0.8)' : '0px solid rgba(0, 0, 0, 0.0)',
          backgroundImage: getContainerBackgroundImage(isTrainable, isPassive),
        }}
      >
        <Keybind ability={ability} selectedUnit={selectedUnit} />
        <ManaCost ability={ability} />
        <Panel
          className={Styles.foreground}
          style={{
            margin: (isPassive && !isTrainable) ? '2px' : '4px',
            padding: (isActive || isToggled || isAutoCastEnabled) ? '1px' : '0px',
            backgroundColor: (isActive || isToggled || isAutoCastEnabled) ? 'rgba(255, 165, 50, 0.2)' : 'black',
          }}
        >
          <Shine ability={ability} selectedUnit={selectedUnit} />
          <Image ability={ability} selectedUnit={selectedUnit} />
          <Cooldown ability={ability} />
          <Autocast ability={ability} />
          <LockoutIcon ability={ability} selectedUnit={selectedUnit} />
          <CastPointOverlay ability={ability} />
        </Panel>
      </Panel>
      <Skillpoints ability={ability} selectedUnit={selectedUnit} />
    </Panel>
  );

};

export default React.memo(AbilityBarItem);


