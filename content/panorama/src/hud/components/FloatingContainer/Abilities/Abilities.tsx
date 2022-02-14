import React, { useRef, useState } from "react";
import { useGameEvent } from "react-panorama";
import Ability from "./Ability/Ability";
import Styles from './styles.module.css';

type Props = {
  unit: EntityIndex,
};

export type IAbility = {
  name: string,
  id: number,
  isItem: boolean,
}

const AbilitiesImpl = (props: Props) => {

  // $.Msg("REACT-RENDER: CloatingContainer - Abilities rendered");

  const { unit } = props;

  const [abilities, setAbilities] = useState<IAbility[]>([]);
  const id = useRef(Number.MIN_SAFE_INTEGER);

  useGameEvent('on_ability_used', (event) => {
    if (unit === event.caster) {
      id.current = id.current + 1;
      setAbilities(prevState => [...prevState, { name: event.name, isItem: event.isItem === 1, id: id.current }] as IAbility[]);
    }
  }, [unit]);

  return (
    <Panel hittest={false} className={Styles.container}>
      {abilities.map((ability) => {
        return (
          <Ability
            key={ability.id}
            id={ability.id}
            name={ability.name}
            isItem={ability.isItem}
            setAbilities={setAbilities}
          />
        )
      })}
    </Panel>
  );

}

export default React.memo(AbilitiesImpl);