import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

type Props = {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
}

const LockoutIcon = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - LockoutIcon rendered");

  const { ability, selectedUnit } = props;

  const [isSilenced, setIsSilenced] = useState(Abilities.GetCooldownTimeRemaining(ability) === 0 && Entities.IsSilenced(selectedUnit));

  useInterval(() => {
    setIsSilenced(Abilities.GetCooldownTimeRemaining(ability) === 0 && Entities.IsSilenced(selectedUnit));
  }, HUD_THINK_FAST);

  if (!isSilenced) {
    return null;
  }

  return (
    <Panel
      className={Styles.container}
      style={{ backgroundColor: isSilenced ? 'rgba(0, 0, 0, 0.9)' : 'none' }}
    >
      <Panel className={Styles.icon} />
    </Panel>
  );

};

export default React.memo(LockoutIcon);
