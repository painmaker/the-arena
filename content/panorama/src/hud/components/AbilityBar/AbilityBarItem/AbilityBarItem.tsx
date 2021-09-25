import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import Cooldown from "./Cooldown/Cooldown";
import Autocast from "./Autocast/Autocast";
import LockoutIcon from "./LockoutIcon/LockoutIcon";
import Skillpoints from "./Skillpoints/Skillpoints";
import ManaCost from "./ManaCost/ManaCost";
import Keybind from "./Keybind/Keybind";
import Image from "./AbilityImage/AbilityImage";
import { Styles } from "./Styles";
import LevelUpButton from "./LevelUpButton/LevelUpButton";
import CastPointOverlay from "./CastPointOverlay/CastPointOverlay";
import { HUD_THINK } from "../../../App";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
}

interface State {
  isPassive: boolean,
  isUpgradeable: boolean,
  isControllable: boolean,
  isAutoCastEnabled: boolean,
  isToggled: boolean,
  isActive: boolean,
  isInLearningMode: boolean,
  hasAbilityPoints: boolean
}

const onMouseOver = (ability: AbilityEntityIndex, selectedUnit: EntityIndex) => {
  $.DispatchEvent(
    "DOTAShowAbilityTooltipForEntityIndex",
    $("#ability_" + ability),
    Abilities.GetAbilityName(ability),
    selectedUnit
  )
}

const onMouseOut = (ability: AbilityEntityIndex) => {
  $.DispatchEvent("DOTAHideAbilityTooltip", $("#ability_" + ability))
}

const onLeftClick = (ability: AbilityEntityIndex, selectedUnit: EntityIndex) => {
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

class AbilityBarItem extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.getContainerBackgroundImage = this.getContainerBackgroundImage.bind(this);
    this.state = {
      isPassive: Abilities.IsPassive(props.ability),
      isUpgradeable: Abilities.CanAbilityBeUpgraded(props.ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED,
      isControllable: Entities.IsControllableByPlayer(props.selectedUnit, Players.GetLocalPlayer()),
      isAutoCastEnabled: Abilities.GetAutoCastState(props.ability),
      isToggled: Abilities.GetToggleState(props.ability),
      isActive: Abilities.GetLocalPlayerActiveAbility() === this.props.ability,
      isInLearningMode: Game.IsInAbilityLearnMode(),
      hasAbilityPoints: Entities.GetAbilityPoints(props.selectedUnit) !== 0,
    }
  }

  componentDidMount() {
    this.props.setInterval(() => {
      this.setState({
        isPassive: Abilities.IsPassive(this.props.ability),
        isUpgradeable: Abilities.CanAbilityBeUpgraded(this.props.ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED,
        isControllable: Entities.IsControllableByPlayer(this.props.selectedUnit, Players.GetLocalPlayer()),
        isAutoCastEnabled: Abilities.GetAutoCastState(this.props.ability),
        isToggled: Abilities.GetToggleState(this.props.ability),
        isActive: Abilities.GetLocalPlayerActiveAbility() === this.props.ability,
        isInLearningMode: Game.IsInAbilityLearnMode(),
        hasAbilityPoints: Entities.GetAbilityPoints(this.props.selectedUnit) !== 0,
      })
    }, HUD_THINK);
  }

  getContainerBackgroundImage(isTrainable: boolean): string {
    if (isTrainable) {
      return 'url("s2r://panorama/images/hud/reborn/levelup_button_learnmode_psd.vtex")';
    }
    if (this.state.isPassive) {
      return 'url("s2r://panorama/images/hud/passive_ability_border_png.vtex")';
    }
    if (this.state.isActive) {
      return 'url("s2r://panorama/images/hud/reborn/active_ability_border_psd.vtex")';
    }
    if (this.state.isAutoCastEnabled || this.state.isToggled) {
      return 'url("s2r://panorama/images/hud/reborn/autocastable_ability_border_psd.vtex")'
    }
    return 'none'
  }

  render() {

    $.Msg("REACT-RENDER: AbilityBar - AbilityBarItem rendered");

    const isAbilityUpgradeable = this.state.isUpgradeable && this.state.isControllable && this.state.hasAbilityPoints;
    const isTrainable = this.state.isInLearningMode && isAbilityUpgradeable;

    return (
      <Panel style={Styles.Container()} id={'ability_' + this.props.ability}>
        <Panel style={Styles.LevelUpButtonContainer()}>
          {isAbilityUpgradeable && (
            <LevelUpButton ability={this.props.ability} />
          )}
        </Panel>
        <Panel
          hittest={true}
          onactivate={() => onLeftClick(this.props.ability, this.props.selectedUnit)}
          oncontextmenu={() => onRightClick(this.props.ability)}
          onmouseover={() => onMouseOver(this.props.ability, this.props.selectedUnit)}
          onmouseout={() => onMouseOut(this.props.ability)}
          style={Styles.AbilityContainer(
            isTrainable,
            this.state.isActive,
            this.state.isAutoCastEnabled,
            this.state.isToggled,
            this.getContainerBackgroundImage(isTrainable)
          )}
        >
          <Image ability={this.props.ability} />
          <Keybind ability={this.props.ability} />
          <ManaCost ability={this.props.ability} />
          <Cooldown ability={this.props.ability} />
          <Autocast ability={this.props.ability} />
          <LockoutIcon ability={this.props.ability} selectedUnit={this.props.selectedUnit} />
          <CastPointOverlay ability={this.props.ability} />
        </Panel>
        <Skillpoints ability={this.props.ability} />
      </Panel>
    );

  }

};

export default withReactTimeout(AbilityBarItem);


