import React, { useContext, useEffect, useState } from "react";
import AbilityBarItem from "./AbilityBarItem/AbilityBarItem";
import { HUD_THINK_FAST } from "../../App";
import { useInterval } from "../../hooks/useInterval";
import Styles from './styles.module.css';
import SelectedEntityIndexContext from "../../context/SelectedEntityIndexContext";
import { isEqual } from "../../utils/isEqual";

const AbilityBar = () => {

  // $.Msg("REACT-RENDER: AbilityBar rendered");

  const { selectedEntityIndex } = useContext(SelectedEntityIndexContext);

  const [abilities, setAbilities] = useState<AbilityEntityIndex[]>([]);
  const [abilityPoints, setAbilityPoints] = useState(0);

  useInterval(() => {
    const abilityCount = Entities.GetAbilityCount(selectedEntityIndex);
    setAbilityPoints(Entities.GetAbilityPoints(selectedEntityIndex));
    const newAbilities = Array.from(Array(abilityCount).keys())
      .map(abilityNumber => Entities.GetAbility(selectedEntityIndex, abilityNumber))
      .filter(index => index !== -1)
      .filter(index => Abilities.IsDisplayedAbility(index));
    setAbilities(oldAbilities => isEqual(oldAbilities, newAbilities) ? oldAbilities : newAbilities)
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
        <AbilityBarItem key={ability} abilityEntityIndex={ability} />
      ))}
    </Panel>
  )

}

export default React.memo(AbilityBar);
