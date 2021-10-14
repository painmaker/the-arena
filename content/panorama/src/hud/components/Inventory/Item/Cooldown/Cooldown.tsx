import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import { Styles } from "./Styles";

type Props = {
  item: ItemEntityIndex
};

const Cooldown = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Cooldown rendered");

  const { item } = props;

  const [degree, setDegree] = useState(0);
  const [remainingCooldown, setRemainingCooldown] = useState(Abilities.GetCooldownTimeRemaining(item));

  useInterval(() => {
    const total = Abilities.GetCooldownLength(item);
    const remaining = Abilities.GetCooldownTimeRemaining(item);
    const degree = Math.min(0, - (remainingCooldown / total) * 360);
    setDegree(Number.isFinite(degree) ? degree : 0);
    setRemainingCooldown(remaining);
  }, HUD_THINK_FAST)

  return (
    <React.Fragment>
      <Panel style={Styles.Container(degree)} />
      {remainingCooldown > 0 && (
        <Label
          style={Styles.Label()}
          text={remainingCooldown > 1.0 ? Math.round(remainingCooldown) : remainingCooldown.toFixed(1)}
        />
      )}
    </React.Fragment>
  );

};

export default React.memo(Cooldown);
