import React, { useEffect, useState } from "react";
import { TableUtils } from "../../utils/TableUtils";
import AbilityBarItem from "./AbilityBarItem/AbilityBarItem";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_FAST } from "../../App";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const AbilityBar = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBar rendered");

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
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [selectedUnit, abilities, setInterval, clearInterval])

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

export default React.memo(ReactTimeout(AbilityBar));
