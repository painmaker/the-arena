import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
  cooldownTimeRemaining: number,
}

const Cooldown = (props: Props) => {

  const { ability, cooldownTimeRemaining, setInterval, clearInterval } = props;

  const [totalCooldown, setTotalCooldown] = useState(Abilities.GetCooldownLength(ability));

  useEffect(() => {

    const update = () => {
      setTotalCooldown(Abilities.GetCooldownLength(ability));
    };

    update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [ability, setInterval, clearInterval]);

  let cooldownClipDegree = Math.min(0, - (cooldownTimeRemaining / totalCooldown) * 360);
  if (Number.isNaN(cooldownClipDegree) || !Number.isFinite(cooldownClipDegree)) {
    cooldownClipDegree = 0;
  }

  if (cooldownTimeRemaining === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.Background(cooldownClipDegree)} />
      <Label
        style={Styles.Label()}
        text={Math.ceil(cooldownTimeRemaining)}
      />
    </Panel>
  );

};

export default withReactTimeout(Cooldown);
