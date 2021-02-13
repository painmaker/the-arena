import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
  unit: EntityIndex,
  isInLearningMode: boolean
}

interface State {
  level: number,
  manaCost: number,
  unitMana: number,
  keybind: string,
  isPassive: boolean,
  isUpgradeable: boolean,
  isControllable: boolean,
  isAutoCastEnabled: boolean,
  isToggled: boolean,
  totalCooldown: number,
  remainingCooldown: number,
}

class AbilityBarItem extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.getSaturation = this.getSaturation.bind(this);
    this.getWashColor = this.getWashColor.bind(this);
    this.getBorder = this.getBorder.bind(this);
    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.state = {
      level: Abilities.GetLevel(props.ability),
      manaCost: Abilities.GetManaCost(props.ability),
      unitMana: Entities.GetMana(props.unit),
      keybind: Abilities.GetKeybind(props.ability),
      isPassive: Abilities.IsPassive(props.ability),
      isUpgradeable: Abilities.CanAbilityBeUpgraded(props.ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED,
      isControllable: Entities.IsControllableByPlayer(props.unit, Players.GetLocalPlayer()),
      isAutoCastEnabled: Abilities.GetAutoCastState(props.ability),
      isToggled: Abilities.GetToggleState(props.ability),
      totalCooldown: Abilities.GetCooldownLength(props.ability),
      remainingCooldown: Abilities.GetCooldownTimeRemaining(props.ability)
    }
  }

  componentDidMount() {
    this.props.setInterval(() => {
      this.setState({
        level: Abilities.GetLevel(this.props.ability),
        manaCost: Abilities.GetManaCost(this.props.ability),
        unitMana: Entities.GetMana(this.props.unit),
        keybind: Abilities.GetKeybind(this.props.ability),
        isPassive: Abilities.IsPassive(this.props.ability),
        isUpgradeable: Abilities.CanAbilityBeUpgraded(this.props.ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED,
        isControllable: Entities.IsControllableByPlayer(this.props.unit, Players.GetLocalPlayer()),
        isAutoCastEnabled: Abilities.GetAutoCastState(this.props.ability),
        isToggled: Abilities.GetToggleState(this.props.ability),
        totalCooldown: Abilities.GetCooldownLength(this.props.ability),
        remainingCooldown: Abilities.GetCooldownTimeRemaining(this.props.ability)
      })
    }, 100);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextProps.ability !== this.props.ability ||
      nextProps.unit !== this.props.unit ||
      nextProps.isInLearningMode !== this.props.isInLearningMode ||
      nextState.level !== this.state.level ||
      nextState.manaCost !== this.state.manaCost ||
      nextState.unitMana !== this.state.unitMana ||
      nextState.keybind !== this.state.keybind ||
      nextState.isPassive !== this.state.isPassive ||
      nextState.isUpgradeable !== this.state.isUpgradeable ||
      nextState.isControllable !== this.state.isControllable ||
      nextState.isAutoCastEnabled !== this.state.isAutoCastEnabled ||
      nextState.isToggled !== this.state.isToggled ||
      nextState.totalCooldown !== this.state.totalCooldown ||
      nextState.remainingCooldown !== this.state.remainingCooldown;
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
    if (this.state.level === 0) {
      return '#303030';
    }
    if (this.state.manaCost > this.state.unitMana) {
      return '#1569be';
    }
    return 'none';
  }

  getBorder(isTrainable: boolean): string {
    if (isTrainable) {
      return '2px solid rgba(255, 165, 0, 1.0)';
    }
    if (this.state.isAutoCastEnabled || this.state.isToggled) {
      return '2px solid dodgerblue';
    }
    return '1px solid rgba(25, 25, 25, 0.9)'
  }

  onLeftClick() {
    if (this.props.isInLearningMode) {
      Abilities.AttemptToUpgrade(this.props.ability);
      return;
    }
    Abilities.ExecuteAbility(this.props.ability, this.props.unit, false);
  }

  onRightClick() {
    if (this.props.isInLearningMode) {
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
      this.props.unit
    )
  }

  onMouseOut() {
    $.DispatchEvent(
      "DOTAHideAbilityTooltip",
      $("#ability_" + this.props.ability)
    )
  }

  render() {

    const isTrainable = this.props.isInLearningMode && this.state.isUpgradeable && this.state.isControllable;
    const cooldownPercent = Math.min(Math.round(100 * this.state.remainingCooldown / this.state.totalCooldown), 100);

    return (
      <Panel
        hittest={true}
        className={'abilityBarItemContainer'}
        id={'ability_' + this.props.ability}
        onactivate={() => this.onLeftClick()}
        oncontextmenu={() => this.onRightClick()}
        onmouseover={() => this.onMouseOver()}
        onmouseout={() => this.onMouseOut()}
      >
        <DOTAAbilityImage
          style={{
            border: this.getBorder(isTrainable),
            washColor: this.getWashColor(isTrainable),
            saturation: this.getSaturation(isTrainable),
          }}
          contextEntityIndex={this.props.ability}
        />
        { (isTrainable || !this.state.isPassive) && (
          <Label
            className={'abilityBarItemKeybindLabel'}
            text={this.state.keybind}
          />
        )}
        { (this.state.manaCost !== 0) && (
          <Label
            className={'abilityBarItemManacostLabel'}
            text={this.state.manaCost}
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
              text={Math.round(this.state.remainingCooldown)}
            />
          </Panel>
        )}
      </Panel>
    );

  }

};

export default withReactTimeout(AbilityBarItem);


