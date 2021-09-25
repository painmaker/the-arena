import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../hooks/useSelectedUnit";
import { TableUtils } from "../../utils/TableUtils";
import AbilityBarItem from "./AbilityBarItem/AbilityBarItem";
import { Styles } from "./Styles";


type Props = ReactTimeoutProps & {
  // ownprops
}

const AbilityBar = (props: Props) => {

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [abilities, setAbilities] = useState<AbilityEntityIndex[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      if (Entities.GetAbilityPoints(selectedUnit) <= 0) {
        Game.EndAbilityLearnMode();
      }
      const newAbilities = Array.from(Array(Entities.GetAbilityCount(selectedUnit)).keys())
        .map(abilityNumber => Entities.GetAbility(selectedUnit, abilityNumber))
        .filter(index => index !== -1)
        .filter(index => Abilities.IsDisplayedAbility(index));
      if (!TableUtils.isEqual(newAbilities, abilities)) {
        setAbilities(newAbilities);
      }
    }, 100);
    return () => clearInterval(id);
  }, [selectedUnit, abilities, setInterval, clearInterval])

  return (
    <Panel hittest={false} style={Styles.Container()}>
      {abilities.map(ability => (
        <AbilityBarItem
          key={selectedUnit + "_" + ability}
          ability={ability}
          unit={selectedUnit}
        />
      ))}
    </Panel>
  )

}

export default withReactTimeout(AbilityBar);
