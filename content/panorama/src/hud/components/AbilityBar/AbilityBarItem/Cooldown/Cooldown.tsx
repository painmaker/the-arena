import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  abilityEntityIndex: AbilityEntityIndex,
  cooldownTimeRemaining: number,
}

const Cooldown = (props: Props) => {

  const [totalCooldown, setTotalCooldown] = useState(Abilities.GetCooldownLength(props.abilityEntityIndex));

  useEffect(() => {
    const id = props.setInterval(() => {
      setTotalCooldown(Abilities.GetCooldownLength(props.abilityEntityIndex));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  let cooldownClipDegree = Math.min(0, - (props.cooldownTimeRemaining / totalCooldown) * 360);
  if (Number.isNaN(cooldownClipDegree) || !Number.isFinite(cooldownClipDegree)) {
    cooldownClipDegree = 0;
  }

  if (props.cooldownTimeRemaining === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.Background(cooldownClipDegree)} />
      <Label style={Styles.Label()} text={Math.ceil(props.cooldownTimeRemaining)} />
    </Panel>
  );

};

export default withReactTimeout(Cooldown);
