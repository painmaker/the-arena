import React, { useRef, useState } from "react";
import { useGameEvent } from "react-panorama";
import Ability from "./Ability/Ability";
import { Styles } from "./Styles";

type Props = {
  unit: EntityIndex,
};

export type Ability = {
  name: string,
  id: number,
}

const Abilities = (props: Props) => {

  // $.Msg("REACT-RENDER: CloatingContainer - Abilities rendered");

  const { unit } = props;

  const [abilities, setAbilities] = useState<Ability[]>([]);
  const id = useRef(Number.MIN_SAFE_INTEGER);

  useGameEvent('on_ability_used', (event) => {
    if (unit === event.unit) {
      id.current = id.current + 1;
      setAbilities(prevState => [...prevState, { name: event.abilityname, id: id.current }] as Ability[]);
    }
  }, [unit]);

  return (
    <Panel hittest={false} style={Styles.Container()}>
      {abilities.map((ability) => {
        return (
          <Ability
            key={ability.id}
            id={ability.id}
            name={ability.name}
            setAbilities={setAbilities}
          />
        )
      })}
    </Panel>
  );

}

export default React.memo(Abilities);