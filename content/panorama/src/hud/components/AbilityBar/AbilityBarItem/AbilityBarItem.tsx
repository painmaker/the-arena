import React, { useEffect, useState } from "react";
import Cooldown from "./Cooldown/Cooldown";
import Autocast from "./Autocast/Autocast";
import LockoutIcon from "./LockoutIcon/LockoutIcon";
import Skillpoints from "./Skillpoints/Skillpoints";
import ManaCost from "./ManaCost/ManaCost";
import Keybind from "./Keybind/Keybind";
import Image from "./Image/Image";
import { Styles } from "./Styles";
import LevelUpButton from "./LevelUpButton/LevelUpButton";
import CastPointOverlay from "./CastPointOverlay/CastPointOverlay";
import { SCHEDULE_THINK_FAST } from "../../../App";
import { cancelSchedule } from "../../../utils/Schedule";

const onMouseOver = (ability: AbilityEntityIndex, selectedUnit: EntityIndex) => {
  $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", $("#ability_" + ability), Abilities.GetAbilityName(ability), selectedUnit);
}

const onMouseOut = (ability: AbilityEntityIndex) => {
  $.DispatchEvent("DOTAHideAbilityTooltip", $("#ability_" + ability));
}

const onLeftClick = (ability: AbilityEntityIndex, selectedUnit: EntityIndex) => {
  if (GameUI.IsAltDown()) {
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

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
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
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => cancelSchedule(schedule, AbilityBarItem.name);
  }, [ability, selectedUnit])

  return (
    <Panel style={Styles.Container()} id={'ability_' + ability} >
      <Panel style={Styles.LevelUpButtonContainer()}>
        <LevelUpButton ability={ability} selectedUnit={selectedUnit} />
      </Panel>
      <Panel
        hittest={true}
        onactivate={() => onLeftClick(ability, selectedUnit)}
        oncontextmenu={() => onRightClick(ability)}
        onmouseover={() => onMouseOver(ability, selectedUnit)}
        onmouseout={() => onMouseOut(ability)}
        style={Styles.AbilityContainer(isTrainable, isActive, isAutoCastEnabled, isToggled, isPassive)}
      >
        <Image ability={ability} selectedUnit={selectedUnit} />
        <Keybind ability={ability} selectedUnit={selectedUnit} />
        <ManaCost ability={ability} />
        <Cooldown ability={ability} />
        <Autocast ability={ability} />
        <LockoutIcon ability={ability} selectedUnit={selectedUnit} />
        {isInAbilityPhase && (
          <CastPointOverlay ability={ability} />
        )}
      </Panel>
      <Skillpoints ability={ability} />
    </Panel>
  );

};

export default React.memo(AbilityBarItem);


