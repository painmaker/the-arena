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

  const [showLock, setShowLock] = useState(false);

  useInterval(() => {
    const isStunned = Entities.IsStunned(selectedUnit);
    const isSilenced = Entities.IsSilenced(selectedUnit);
    const isCommandRestricted = Entities.IsCommandRestricted(selectedUnit);
    const isNightmared = Entities.IsNightmared(selectedUnit);
    const isHexed = Entities.IsHexed(selectedUnit);
    const cooldownRemaining = Abilities.GetCooldownTimeRemaining(ability);
    const showLock = cooldownRemaining === 0 && (isStunned || isSilenced || isCommandRestricted || isNightmared || isHexed);
    setShowLock(showLock);
  }, HUD_THINK_FAST);

  if (!showLock) {
    return null;
  }

  return (
    <Panel
      className={Styles.container}
      style={{ backgroundColor: showLock ? 'rgba(0, 0, 0, 0.9)' : 'none' }}
    >
      <Panel className={Styles.icon} />
    </Panel>
  );

};

export default React.memo(LockoutIcon);
