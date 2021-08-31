import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { TableUtils } from "../../utils/TableUtils";
import AbilityBarItem from "./AbilityBarItem/AbilityBarItem";
import { Styles } from "./Styles";


type Props = ReactTimeoutProps & {}

interface State {
  entityUnitIndex: EntityIndex,
  isInLearningMode: boolean,
  abilityIndexes: AbilityEntityIndex[],
}

class AbilityBar extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      entityUnitIndex: Players.GetLocalPlayerPortraitUnit(),
      isInLearningMode: false,
      abilityIndexes: [],
    }
  }

  componentDidMount() {
    this.props.setInterval(() => {

      if (Entities.GetAbilityPoints(Players.GetLocalPlayerPortraitUnit()) <= 0) {
        Game.EndAbilityLearnMode();
      }

      const indexes = Array
        .from(Array(Entities.GetAbilityCount(Players.GetLocalPlayerPortraitUnit())).keys())
        .map(abilityNumber => Entities.GetAbility(Players.GetLocalPlayerPortraitUnit(), abilityNumber))
        .filter(index => index !== -1)
        .filter(index => Abilities.IsDisplayedAbility(index));

      this.setState({
        entityUnitIndex: Players.GetLocalPlayerPortraitUnit(),
        isInLearningMode: Game.IsInAbilityLearnMode(),
        abilityIndexes: indexes,
      })

    }, 100);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps !== this.props) {
      return true;
    }
    if (this.state.entityUnitIndex !== nextState.entityUnitIndex) {
      return true;
    }
    if (this.state.isInLearningMode !== nextState.isInLearningMode) {
      return true;
    }
    if (!TableUtils.isEqual(this.state.abilityIndexes, nextState.abilityIndexes)) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Panel hittest={false} style={Styles.Container()}>
        {this.state.abilityIndexes.map(abilityEntityIndex => (
          <AbilityBarItem
            key={this.state.entityUnitIndex + "_" + abilityEntityIndex}
            ability={abilityEntityIndex}
            unit={this.state.entityUnitIndex}
          />
        ))}
      </Panel>
    )
  }

}

export default withReactTimeout(AbilityBar);

