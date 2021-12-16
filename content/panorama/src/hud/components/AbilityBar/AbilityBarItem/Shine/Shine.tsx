import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import usePrevious from "../../../../hooks/usePrevious";

type Props = {
  ability: AbilityEntityIndex,
  selectedUnit: EntityIndex,
};

const Shine = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Shine rendered");

  const { ability, selectedUnit } = props;

  const [isSilenced, setIsSilenced] = useState(Abilities.GetCooldownTimeRemaining(ability) === 0 && Entities.IsSilenced(selectedUnit));
  const wasSilenced = usePrevious(isSilenced);
  const [isOnCooldown, setIsOnCooldown] = useState(!Abilities.IsCooldownReady(ability));
  const wasOnCooldown = usePrevious(isOnCooldown);

  useInterval(() => {
    setIsSilenced(Abilities.GetCooldownTimeRemaining(ability) === 0 && Entities.IsSilenced(selectedUnit));
    setIsOnCooldown(!Abilities.IsCooldownReady(ability));
  }, HUD_THINK_FAST);

  const showSweep = (isOnCooldown === false && wasOnCooldown === true && isSilenced === false) ||
    (isSilenced === false && wasSilenced === true && isOnCooldown === false);

  return (
    <Panel className={showSweep ? 'shineSweep' : ''} />
  );

};

export default React.memo(Shine);
