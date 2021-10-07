import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import { SCHEDULE_THINK_FAST } from "../../../App";
import { cancelSchedule } from "../../../utils/Schedule";
import Ability from "./Ability/Ability";
import { Styles } from "./Styles";

type Props = {
  unit: EntityIndex,
};

type Ability = {
  name: string,
  id: number,
}

const Abilities = (props: Props) => {

  // $.Msg("REACT-RENDER: CloatingContainer - Abilities rendered");

  const { unit } = props;

  const [abilities, setAbilities] = useState<Ability[]>([]);

  useGameEvent('on_ability_used', (event) => {

    if (unit !== event.unit) {
      return;
    }

    const id = Math.random();

    setAbilities(prevState => [...prevState, { name: event.abilityname, id }] as Ability[]);

    const update = () => {
      setAbilities(prevState => prevState.filter(ability => ability.id !== id));
    }

    let schedule = $.Schedule(1, update);

    return () => cancelSchedule(schedule, Abilities.name)

  }, [unit]);

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

export default React.memo(Abilities);