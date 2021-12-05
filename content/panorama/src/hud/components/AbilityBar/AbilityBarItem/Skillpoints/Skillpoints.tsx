import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

type Props = {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
}

const Skillpoints = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Skillpoints rendered");

  const { ability, selectedUnit } = props;

  const [abilityLevel, setAbilityLevel] = useState(Abilities.GetLevel(ability));
  const [maxAbilityLevel, setMaxAbilityLevel] = useState(Abilities.GetMaxLevel(ability));
  const [isUpgradeable, setIsUpgradeable] = useState(false);

  useInterval(() => {
    setAbilityLevel(Abilities.GetLevel(ability));
    setMaxAbilityLevel(Abilities.GetMaxLevel(ability));
    setIsUpgradeable(Entities.GetAbilityPoints(selectedUnit) > 0 && Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED);
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
              style={{
                backgroundColor: abilityLevel >= index ? 'orange' : 'black',
                boxShadow: (isUpgradeable && index === (abilityLevel + 1)) ? 'fill rgba(255, 174, 0, 0.6) 0px 0px 2px 1px' : 'fill rgba(0, 0, 0, 0.4) 0px 0px 2px 0.5px'
              }}
            />
          </Panel>
        )
      })}
    </Panel>
  );

};

export default React.memo(Skillpoints);
