import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import usePrevious from "../../../../hooks/usePrevious";

type Props = {
  item: ItemEntityIndex,
  selectedUnit: EntityIndex,
};

const Shine = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Shine rendered");

  const { item, selectedUnit } = props;

  const [isMuted, setIsMuted] = useState(Entities.IsMuted(selectedUnit));
  const wasMuted = usePrevious(isMuted);
  const [isOnCooldown, setIsOnCooldown] = useState(!Abilities.IsCooldownReady(item));
  const wasOnCooldown = usePrevious(isOnCooldown);

  useInterval(() => {
    setIsMuted(Entities.IsMuted(selectedUnit));
    setIsOnCooldown(!Abilities.IsCooldownReady(item));
  }, HUD_THINK_FAST);

  useEffect(() => {
    const showSweep = (isOnCooldown === false && wasOnCooldown === true && isMuted === false) ||
      (isMuted === false && wasMuted === true && isOnCooldown === false);
    $("#inventory_item_shine_panel_" + item)?.SetHasClass('offCooldownShine', showSweep)
  }, [isMuted, wasMuted, isOnCooldown, wasOnCooldown])

  return (
    <Panel id={'inventory_item_shine_panel_' + item} />
  );

};

export default React.memo(Shine);
