import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

type Props = {
  ability: AbilityEntityIndex
}

const Skillpoints = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Skillpoints rendered");

  const { ability } = props;

  const [abilityLevel, setAbilityLevel] = useState(Abilities.GetLevel(ability));
  const [maxAbilityLevel, setMaxAbilityLevel] = useState(Abilities.GetMaxLevel(ability));

  useInterval(() => {
    setAbilityLevel(Abilities.GetLevel(ability));
    setMaxAbilityLevel(Abilities.GetMaxLevel(ability));
  }, HUD_THINK_FAST);

  return (
    <Panel className={Styles.container}>
      {Array.from({ length: maxAbilityLevel }, (_, index) => index + 1).map(index => {
        return (
          <Panel
            key={ability + '_level_' + index}
            className={Styles.column}
            style={{ width: 100 / maxAbilityLevel + '%' }}
          >
            <Panel
              className={Styles.skillpoint}
              style={{ backgroundColor: abilityLevel >= index ? 'orange' : 'black' }}
            />
          </Panel>
        )
      })}
    </Panel>
  );

};

export default React.memo(Skillpoints);
