import React, { useEffect, useState } from "react";
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



  useEffect(() => {
    const showSweep = (isOnCooldown === false && wasOnCooldown === true && isSilenced === false) ||
      (isSilenced === false && wasSilenced === true && isOnCooldown === false);
    $("#ability_bar_item_shine_panel_" + ability)?.SetHasClass('abilityBarItemShine', showSweep)
  }, [isSilenced, wasSilenced, isOnCooldown, wasOnCooldown])

  return (
    <Panel id={'ability_bar_item_shine_panel_' + ability} />
  );

};

export default React.memo(Shine);
