import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex
};

const Cooldown = (props: Props) => {

  const { item, setInterval, clearInterval } = props;

  const [totalCooldown, setTotalCooldown] = useState(Abilities.GetCooldownLength(item))
  const [remainingCooldown, setRemainingCooldown] = useState(Abilities.GetCooldownTimeRemaining(item))

  useEffect(() => {

    const update = () => {
      setTotalCooldown(Abilities.GetCooldownLength(item));
      setRemainingCooldown(Abilities.GetCooldownTimeRemaining(item));
    };

    update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [item, setInterval, clearInterval]);

  let degree = Math.min(0, - (remainingCooldown / totalCooldown) * 360);
  if (Number.isNaN(degree) || !Number.isFinite(degree)) {
    degree = 0;
  }

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

export default withReactTimeout(Cooldown);
