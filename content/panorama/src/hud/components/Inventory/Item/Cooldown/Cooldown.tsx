import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex
};

const Cooldown = (props: Props) => {

  const [totalCooldown, setTotalCooldown] = useState(Abilities.GetCooldownLength(props.item))
  const [remainingCooldown, setRemainingCooldown] = useState(Abilities.GetCooldownTimeRemaining(props.item))

  useEffect(() => {
    const id = props.setInterval(() => {
      setTotalCooldown(Abilities.GetCooldownLength(props.item));
      setRemainingCooldown(Abilities.GetCooldownTimeRemaining(props.item));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

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
