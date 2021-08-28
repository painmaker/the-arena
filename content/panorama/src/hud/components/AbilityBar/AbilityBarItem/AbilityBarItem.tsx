import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
  unit: EntityIndex,
  isInLearningMode: boolean,
}

interface State {
  level: number,
  maxLevel: number,
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
  isActive: boolean,
  hasAbilityPoints: boolean
}

class AbilityBarItem extends React.Component<Props, State> {

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
      maxLevel: Abilities.GetMaxLevel(props.ability),
      manaCost: Abilities.GetManaCost(props.ability),
      unitMana: Entities.GetMana(props.unit),
      keybind: Abilities.GetKeybind(props.ability),
      isPassive: Abilities.IsPassive(props.ability),
      isUpgradeable: Abilities.CanAbilityBeUpgraded(props.ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED,
      isControllable: Entities.IsControllableByPlayer(props.unit, Players.GetLocalPlayer()),
      isAutoCastEnabled: Abilities.GetAutoCastState(props.ability),
      isToggled: Abilities.GetToggleState(props.ability),
      totalCooldown: Abilities.GetCooldownLength(props.ability),
      remainingCooldown: Abilities.GetCooldownTimeRemaining(props.ability),
      isActive: Abilities.GetLocalPlayerActiveAbility() === this.props.ability,
      hasAbilityPoints: Entities.GetAbilityPoints(props.unit) !== 0,
    }
  }

  componentDidMount() {
    this.props.setInterval(() => {
      this.setState({
        level: Abilities.GetLevel(this.props.ability),
        maxLevel: Abilities.GetMaxLevel(this.props.ability),
        manaCost: Abilities.GetManaCost(this.props.ability),
        unitMana: Entities.GetMana(this.props.unit),
        keybind: Abilities.GetKeybind(this.props.ability),
        isPassive: Abilities.IsPassive(this.props.ability),
        isUpgradeable: Abilities.CanAbilityBeUpgraded(this.props.ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED,
        isControllable: Entities.IsControllableByPlayer(this.props.unit, Players.GetLocalPlayer()),
        isAutoCastEnabled: Abilities.GetAutoCastState(this.props.ability),
        isToggled: Abilities.GetToggleState(this.props.ability),
        totalCooldown: Abilities.GetCooldownLength(this.props.ability),
        remainingCooldown: Abilities.GetCooldownTimeRemaining(this.props.ability),
        isActive: Abilities.GetLocalPlayerActiveAbility() === this.props.ability,
        hasAbilityPoints: Entities.GetAbilityPoints(this.props.unit) !== 0,
      })
    }, 100);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextProps !== this.props || nextState !== this.state;
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
    if (this.state.remainingCooldown > 0) {
      return 'rgba(0, 0, 0, 0.8)'
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
      <Panel style={{ flowChildren: 'down' }} id={'ability_' + this.props.ability}>
        <Panel style={{ width: '100%', height: '40px', flowChildren: 'down' }}>
          {(this.state.isUpgradeable && this.state.isControllable && this.state.hasAbilityPoints) && (
            <Panel style={{ flowChildren: 'down' }}>
              <DOTAScenePanel
                map={'scenes/hud/levelupburst'}
                camera={'camera_1'}
                style={{
                  width: '48px',
                  height: '20px',
                  marginTop: '4px',
                  verticalAlign: 'bottom',
                }}
              />
              <Panel
                style={{
                  backgroundImage: 'url("s2r://panorama/images/hud/reborn/levelup_button_2_psd.vtex")',
                  width: '48px',
                  height: '20px',
                  backgroundSize: '100% 100%',
                  backgroundPosition: '50% 50%',
                  backgroundRepeat: 'no-repeat',
                  transitionProperty: 'opacity, brigthness, pre-transform-scale2d',
                  transitionTimingFunction: 'ease-in-out',
                  transitionDuration: '0.2s',
                  marginBottom: '-4px',
                  verticalAlign: 'bottom',
                  horizontalAlign: 'center',
                  zIndex: 999,
                }}
                onactivate={() => Abilities.AttemptToUpgrade(this.props.ability)}
              >
                <Panel style={{
                  height: '12px',
                  width: '12px',
                  backgroundImage: 'url("s2r://panorama/images/hud/reborn/levelup_plus_well_psd.vtex")',
                  backgroundSize: '100% 100%',
                  backgroundPosition: '50% 50%',
                  backgroundRepeat: 'no-repeat',
                  verticalAlign: 'center',
                  horizontalAlign: 'center',
                  marginBottom: '2px',
                }} />
              </Panel>
            </Panel>
          )}
        </Panel>
        <Panel
          hittest={true}
          onactivate={() => this.onLeftClick()}
          oncontextmenu={() => this.onRightClick()}
          onmouseover={() => this.onMouseOver()}
          onmouseout={() => this.onMouseOut()}
          style={{
            width: "48px",
            height: "48px",
            marginRight: "15px",
            backgroundColor: this.state.isActive ? 'rgba(255, 255, 255, 0.4)' : "rgba(0, 0, 0, 0.8)",
            backgroundImage: this.getContainerBackgroundImage(isTrainable),
            backgroundSize: '100% 100%',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
            padding: isTrainable ? '4px' : this.state.isActive || this.state.isAutoCastEnabled || this.state.isToggled ? '3px' : '1px',

          }}
        >
          <DOTAAbilityImage
            style={{
              border: '2px solid rgba(25, 25, 25, 0.9)',
              washColor: this.getWashColor(isTrainable),
              saturation: this.getSaturation(isTrainable),
            }}
            contextEntityIndex={this.props.ability}
          />
          {(isTrainable || !this.state.isPassive) && (
            <Label
              className={'abilityBarItemKeybindLabel'}
              text={this.state.keybind}
            />
          )}
          {(this.state.manaCost !== 0) && (
            <Label
              className={'abilityBarItemManacostLabel'}
              text={this.state.manaCost}
            />
          )}
          {cooldownPercent > 0 && (
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
          {this.state.isAutoCastEnabled && (
            <DOTAScenePanel
              map={'scenes/hud/autocasting'}
              style={{
                width: "100%",
                height: "100%",
                zIndex: 999,
                padding: "-4px"
              }}
            />
          )}
        </Panel>
        <Panel style={{
          width: '48px',
          height: '5px',
          marginTop: '4px',
          flowChildren: 'right',
          paddingLeft: '10px',
          paddingRight: '10px'
        }}>
          {Array.from({ length: this.state.maxLevel }, (_, index) => index + 1).map(level => {
            const width = 100 / this.state.maxLevel;
            return (
              <Panel
                key={this.props.ability + '_level_' + level}
                style={{
                  width: width + '%',
                  height: '5px',
                }}>
                <Panel style={{
                  width: '5px',
                  height: '5px',
                  horizontalAlign: 'center',
                  backgroundColor: this.state.level >= level ? 'orange' : 'black',
                  borderRadius: '50%',
                  border: "1px solid black",
                }} />
              </Panel>
            )
          })}
        </Panel>
      </Panel>
    );

  }

};

export default withReactTimeout(AbilityBarItem);


