import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import usePrevious from "../../../../hooks/usePrevious";

type Props = {
  item: ItemEntityIndex
};

const Shine = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Shine rendered");

  const { item } = props;

  const [isOnCooldown, setIsOnCooldown] = useState(!Abilities.IsCooldownReady(item));
  const wasOnCooldown = usePrevious(isOnCooldown);

  useInterval(() => {
    setIsOnCooldown(!Abilities.IsCooldownReady(item));
  }, HUD_THINK_FAST);

  const showSweep = isOnCooldown === false && wasOnCooldown === true;

  return (
    <Panel className={showSweep ? 'shineSweep' : ''} />
  );

};

export default React.memo(Shine);
