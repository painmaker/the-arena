import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { HUD_THINK_FAST } from "../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { RootState } from "../../reducers/rootReducer";
import { TableUtils } from "../../utils/TableUtils";
import AbilityBarItem from "./AbilityBarItem/AbilityBarItem";
import { Styles } from "./Styles";

const mapStateToProps = (state: RootState) => ({
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
};

const AbilityBar = (props: Props) => {

  $.Msg("REACT-RENDER: AbilityBar rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [abilities, setAbilities] = useState<AbilityEntityIndex[]>([]);

  useEffect(() => {

    const update = () => {
      const newAbilities = Array.from(Array(Entities.GetAbilityCount(selectedUnit)).keys())
        .map(abilityNumber => Entities.GetAbility(selectedUnit, abilityNumber))
        .filter(index => index !== -1)
        .filter(index => Abilities.IsDisplayedAbility(index));
      if (!TableUtils.isEqual(newAbilities, abilities)) {
        setAbilities(newAbilities);
      }
    };

    update();
    const id = setInterval(update, HUD_THINK_FAST);

    return () => clearInterval(id);

  }, [selectedUnit, abilities, setInterval, clearInterval])

  useEffect(() => {
    if (Entities.GetAbilityPoints(selectedUnit) <= 0) {
      Game.EndAbilityLearnMode();
    }
  }, [selectedUnit])

  return (
    <Panel hittest={false} style={Styles.Container()}>
      {abilities.map(ability => (
        <AbilityBarItem
          key={ability}
          ability={ability}
          selectedUnit={selectedUnit}
        />
      ))}
    </Panel>
  )

}

export default React.memo(connector(withReactTimeout(AbilityBar)));
