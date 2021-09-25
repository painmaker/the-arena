import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import Cooldown from "./Cooldown/Cooldown";
import Autocast from "./Autocast/Autocast";
import LockoutIcon from "./LockoutIcon/LockoutIcon";
import Skillpoints from "./Skillpoints/Skillpoints";
import ManaCost from "./ManaCost/ManaCost";
import Keybind from "./Keybind/Keybind";
import AbilityImage from "./AbilityImage/AbilityImage";
import { Styles } from "./Styles";
import LevelUpButton from "./LevelUpButton/LevelUpButton";
import CastPointOverlay from "./CastPointOverlay/CastPointOverlay";
import { HUD_THINK } from "../../../App";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
}

interface State {
  level: number,
  manaCost: number,
  unitMana: number,
  isPassive: boolean,
  isUpgradeable: boolean,
  isControllable: boolean,
  isAutoCastEnabled: boolean,
  isToggled: boolean,
  isActive: boolean,
  isInLearningMode: boolean,
  cooldownTimeRemaining: number,
  hasAbilityPoints: boolean
}

class AbilityBarItem extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.getSaturation = this.getSaturation.bind(this);
    this.getWashColor = this.getWashColor.bind(this);
    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.getContainerBackgroundImage = this.getContainerBackgroundImage.bind(this);
    this.state = {
      level: Abilities.GetLevel(props.ability),
      manaCost: Abilities.GetManaCost(props.ability),
      unitMana: Entities.GetMana(props.selectedUnit),
      isPassive: Abilities.IsPassive(props.ability),
      isUpgradeable: Abilities.CanAbilityBeUpgraded(props.ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED,
      isControllable: Entities.IsControllableByPlayer(props.selectedUnit, Players.GetLocalPlayer()),
      isAutoCastEnabled: Abilities.GetAutoCastState(props.ability),
      isToggled: Abilities.GetToggleState(props.ability),
      isActive: Abilities.GetLocalPlayerActiveAbility() === this.props.ability,
      isInLearningMode: Game.IsInAbilityLearnMode(),
      cooldownTimeRemaining: Abilities.GetCooldownTimeRemaining(props.ability),
      hasAbilityPoints: Entities.GetAbilityPoints(props.selectedUnit) !== 0,
    }
  }

  componentDidMount() {
    this.props.setInterval(() => {
      this.setState({
        level: Abilities.GetLevel(this.props.ability),
        manaCost: Abilities.GetManaCost(this.props.ability),
        unitMana: Entities.GetMana(this.props.selectedUnit),
        isPassive: Abilities.IsPassive(this.props.ability),
        isUpgradeable: Abilities.CanAbilityBeUpgraded(this.props.ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED,
        isControllable: Entities.IsControllableByPlayer(this.props.selectedUnit, Players.GetLocalPlayer()),
        isAutoCastEnabled: Abilities.GetAutoCastState(this.props.ability),
        isToggled: Abilities.GetToggleState(this.props.ability),
        isActive: Abilities.GetLocalPlayerActiveAbility() === this.props.ability,
        isInLearningMode: Game.IsInAbilityLearnMode(),
        cooldownTimeRemaining: Abilities.GetCooldownTimeRemaining(this.props.ability),
        hasAbilityPoints: Entities.GetAbilityPoints(this.props.selectedUnit) !== 0,
      })
    }, HUD_THINK);
  }

  getSaturation(isTrainable: boolean): string {
    if (isTrainable) {
      return '1.0';
    }
    if (this.state.level === 0) {
      return '0.0';
    }
    if (this.state.manaCost > this.state.unitMana) {
      return '0.0';
    }
    return '1.0';
  }

  getWashColor(isTrainable: boolean): string {
    if (isTrainable) {
      return 'none';
    }
    if (this.state.manaCost > this.state.unitMana) {
      return '#1569be';
    }
    if (this.state.cooldownTimeRemaining > 0) {
      return 'rgba(0, 0, 0, 0.4)'
    }
    if (this.state.level === 0) {
      return '#303030';
    }
    return 'none';
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

  onLeftClick() {
    if (Game.IsInAbilityLearnMode()) {
      Abilities.AttemptToUpgrade(this.props.ability);
      return;
    }
    if (Entities.IsStunned(this.props.selectedUnit) || Entities.IsCommandRestricted(this.props.selectedUnit)) {
      Game.EmitSound("General.CastFail_Custom");
      return;
    }
    if (Entities.IsSilenced(this.props.selectedUnit)) {
      Game.EmitSound("General.CastFail_Silenced");
      return;
    }
    Abilities.ExecuteAbility(this.props.ability, this.props.selectedUnit, false);
  }

  onRightClick() {
    if (Game.IsInAbilityLearnMode()) {
      return;
    }
    if (Abilities.IsAutocast(this.props.ability)) {
      Game.PrepareUnitOrders({
        OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO,
        AbilityIndex: this.props.ability
      });
    }
  }

  onMouseOver() {
    $.DispatchEvent(
      "DOTAShowAbilityTooltipForEntityIndex",
      $("#ability_" + this.props.ability),
      Abilities.GetAbilityName(this.props.ability),
      this.props.selectedUnit
    )
  }

  onMouseOut() {
    $.DispatchEvent("DOTAHideAbilityTooltip", $("#ability_" + this.props.ability))
  }

  render() {

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
          onactivate={() => this.onLeftClick()}
          oncontextmenu={() => this.onRightClick()}
          onmouseover={() => this.onMouseOver()}
          onmouseout={() => this.onMouseOut()}
          style={Styles.AbilityContainer(
            isTrainable,
            this.state.isActive,
            this.state.isAutoCastEnabled,
            this.state.isToggled,
            this.getContainerBackgroundImage(isTrainable)
          )}
        >
          <AbilityImage
            ability={this.props.ability}
            washColor={this.getWashColor(isTrainable)}
            saturation={this.getSaturation(isTrainable)}
          />
          {Entities.IsControllableByPlayer(this.props.selectedUnit, Players.GetLocalPlayer()) && (
            <Keybind
              ability={this.props.ability}
              isTrainable={isTrainable}
              isPassive={this.state.isPassive}
            />
          )}
          <ManaCost
            manaCost={this.state.manaCost}
          />
          <Cooldown
            ability={this.props.ability}
            cooldownTimeRemaining={this.state.cooldownTimeRemaining}
          />
          <Autocast
            enabled={this.state.isAutoCastEnabled}
          />
          {this.state.cooldownTimeRemaining === 0 && (
            <LockoutIcon
              selectedUnit={this.props.selectedUnit}
            />
          )}
          <CastPointOverlay ability={this.props.ability} />
        </Panel>
        <Skillpoints ability={this.props.ability} />
      </Panel>
    );

  }

};

export default withReactTimeout(AbilityBarItem);


