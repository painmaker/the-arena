import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../hooks/useSelectedUnit";
import { TableUtils } from "../../utils/TableUtils";
import AbilityBarItem from "./AbilityBarItem/AbilityBarItem";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  // ownprops
}

const getUnitAbilities = (selectedUnit: EntityIndex) => {
  return Array.from(Array(Entities.GetAbilityCount(selectedUnit)).keys())
    .map(abilityNumber => Entities.GetAbility(selectedUnit, abilityNumber))
    .filter(index => index !== -1)
    .filter(index => Abilities.IsDisplayedAbility(index));
}

const AbilityBar = (props: Props) => {

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [abilities, setAbilities] = useState<AbilityEntityIndex[]>([]);

  useEffect(() => {

    const update = () => {
      const newAbilities = getUnitAbilities(selectedUnit);
      if (!TableUtils.isEqual(newAbilities, abilities)) {
        setAbilities(newAbilities);
      }
    };

    update();
    const id = setInterval(update, 3);

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

export default withReactTimeout(AbilityBar);
