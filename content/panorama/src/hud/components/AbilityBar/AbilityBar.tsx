import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { SCHEDULE_THINK_FAST } from "../../App";
import { RootState } from "../../reducers/rootReducer";
import { cancelSchedule } from "../../utils/Schedule";
import { TableUtils } from "../../utils/TableUtils";
import AbilityBarItem from "./AbilityBarItem/AbilityBarItem";
import { Styles } from "./Styles";

const mapStateToProps = (state: RootState) => ({
  selectedUnit: state.selectedUnitReducer.selectedUnit,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const AbilityBar = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBar rendered");

  const { selectedUnit } = props;

  const [abilities, setAbilities] = useState<AbilityEntityIndex[]>([]);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      const newAbilities = Array.from(Array(Entities.GetAbilityCount(selectedUnit)).keys())
        .map(abilityNumber => Entities.GetAbility(selectedUnit, abilityNumber))
        .filter(index => index !== -1)
        .filter(index => Abilities.IsDisplayedAbility(index));
      if (!TableUtils.isEqual(newAbilities, abilities)) {
        setAbilities(newAbilities);
      }
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);
    };
    update();
    return () => cancelSchedule(schedule, AbilityBar.name);
  }, [selectedUnit, abilities])

  useEffect(() => {
    if (Entities.GetAbilityPoints(selectedUnit) <= 0) {
      Game.EndAbilityLearnMode();
    }
  }, [selectedUnit])

  return (
    <Panel hittest={false} style={Styles.Container()}>
      {abilities.map((ability) => (
        <AbilityBarItem
          key={ability}
          ability={ability}
          selectedUnit={selectedUnit}
        />
      ))}
    </Panel>
  )

}

export default React.memo(connector(AbilityBar));
