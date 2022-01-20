import React, { useEffect, useState } from "react";
import { TableUtils } from "../../utils/TableUtils";
import AbilityBarItem from "./AbilityBarItem/AbilityBarItem";
import { HUD_THINK_FAST, SelectedUnitContext } from "../../App";
import { useInterval } from "../../hooks/useInterval";
import Styles from './styles.module.css';

const AbilityBar = () => {

  // $.Msg("REACT-RENDER: AbilityBar rendered");

  const { selectedUnit } = React.useContext(SelectedUnitContext);

  const [abilities, setAbilities] = useState<AbilityEntityIndex[]>([]);
  const [abilityPoints, setAbilityPoints] = useState(0);

  useInterval(() => {
    const abilityCount = Entities.GetAbilityCount(selectedUnit);
    if (abilityCount > 0) {
      const newAbilities = Array.from(Array(abilityCount).keys())
        .map(abilityNumber => Entities.GetAbility(selectedUnit, abilityNumber))
        .filter(index => index !== -1)
        .filter(index => Abilities.IsDisplayedAbility(index));
      if (!TableUtils.areTablesEqual(newAbilities, abilities)) {
        setAbilities(newAbilities);
      }
    }
    setAbilityPoints(Entities.GetAbilityPoints(selectedUnit));
  }, HUD_THINK_FAST);

  useEffect(() => {
    if (abilityPoints <= 0) {
      Game.EndAbilityLearnMode();
    }
  }, [abilityPoints]);

  if (abilities.length === 0) {
    return null;
  }

  return (
    <Panel className={Styles.container}>
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

export default React.memo(AbilityBar);
