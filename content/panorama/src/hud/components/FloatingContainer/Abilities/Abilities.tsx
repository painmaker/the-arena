import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import Ability from "./Ability/Ability";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  unit: EntityIndex,
};

type Ability = {
  name: string,
  id: number,
}

const Abilities = (props: Props) => {

  // $.Msg("REACT-RENDER: CloatingContainer - Abilities rendered");

  const { unit, setTimeout, clearTimeout } = props;

  const [abilities, setAbilities] = useState<Ability[]>([]);

  useGameEvent('on_ability_used', (event) => {

    if (unit !== event.unit) {
      return;
    }

    const abilityId = Math.random();

    setAbilities(prevState => [...prevState, { name: event.abilityname, id: abilityId }] as Ability[]);

    const update = () => setAbilities(prevState => prevState.filter(ability => ability.id !== abilityId));

    const id = setTimeout!(update, 1000);

    return () => clearTimeout!(id);

  }, [unit, setTimeout, clearTimeout]);

  return (
    <Panel hittest={false} style={Styles.Container()}>
      {abilities.map((ability) => {
        return (
          <Ability
            key={ability.id}
            name={ability.name}
          />
        )
      })}
    </Panel>
  );

}

export default React.memo(ReactTimeout(Abilities));