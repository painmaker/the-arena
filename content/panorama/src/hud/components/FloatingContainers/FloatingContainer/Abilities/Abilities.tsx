import React, { useRef, useState } from "react";
import useGameEvent from "../../../../hooks/useGameEvent";
import Ability from "./Ability/Ability";
import Styles from './styles.module.css';

type Props = {
  entityIndex: EntityIndex,
};

export type IAbility = {
  name: string,
  id: number,
  isItem: boolean,
}

const AbilitiesImpl = (props: Props) => {

  // $.Msg("REACT-RENDER: Abilities rendered");

  const { entityIndex } = props;

  const [abilities, setAbilities] = useState<IAbility[]>([]);
  const id = useRef(Number.MIN_SAFE_INTEGER);

  useGameEvent('on_ability_used', (event) => {
    if (entityIndex === event.caster) {
      id.current = id.current + 1;
      setAbilities(prevState => [
        ...prevState,
        { 
          name: event.name,
          isItem: event.isItem === 1,
          id: id.current
        }
      ]);
    }
  }, [entityIndex]);

  return (
    <Panel hittest={false} className={Styles.container}>
      {abilities.map((ability) => {
        const { id, name, isItem } = ability;
        return (
          <Ability
            key={id}
            id={id}
            name={name}
            isItem={isItem}
            setAbilities={setAbilities}
          />
        )
      })}
    </Panel>
  );

}

export default React.memo(AbilitiesImpl);