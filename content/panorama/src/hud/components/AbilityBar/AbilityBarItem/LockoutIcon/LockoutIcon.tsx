import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
}

const LockoutIcon = (props: Props) => {

  $.Msg("REACT-RENDER: AbilityBarItem - LockoutIcon rendered");

  const { ability, selectedUnit, setInterval, clearInterval } = props;

  const [showLock, setShowLock] = useState(false);

  useEffect(() => {

    const update = () => {
      const isStunned = Entities.IsStunned(selectedUnit);
      const isSilenced = Entities.IsSilenced(selectedUnit);
      const isCommandRestricted = Entities.IsCommandRestricted(selectedUnit);
      const isNightmared = Entities.IsNightmared(selectedUnit);
      const isHexed = Entities.IsHexed(selectedUnit);
      const cooldownRemaining = Abilities.GetCooldownTimeRemaining(ability);
      const showLock = cooldownRemaining !== 0 && (isStunned || isSilenced || isCommandRestricted || isNightmared || isHexed);
      setShowLock(showLock);
    };

    // update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [ability, selectedUnit, setInterval, clearInterval]);

  if (!showLock) {
    return null;
  }

  return (
    <Panel style={Styles.Container(showLock)}>
      <Panel style={Styles.Icon()} />
    </Panel>
  );

};

export default withReactTimeout(LockoutIcon);
