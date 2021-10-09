import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_FAST } from "../../../../App";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
}

const Cooldown = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Cooldown rendered");

  const { ability, setInterval, clearInterval } = props;

  const [degree, setDegree] = useState(0);
  const [cooldownTimeRemaining, setCooldownTimeRemaining] = useState(0);

  useEffect(() => {
    const update = () => {
      const totalCooldown = Abilities.GetCooldown(ability);
      const cooldownTimeRemaining = Abilities.GetCooldownTimeRemaining(ability);
      const degree = Math.min(0, - (cooldownTimeRemaining / totalCooldown) * 360);
      if (Number.isNaN(degree) || !Number.isFinite(degree)) {
        setDegree(0)
      } else {
        setDegree(degree);
      }
      setCooldownTimeRemaining(cooldownTimeRemaining);
    };
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [ability, setInterval, clearInterval]);

  if (cooldownTimeRemaining === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.Background(degree)} />
      <Label
        style={Styles.Label()}
        text={Math.ceil(cooldownTimeRemaining)}
      />
    </Panel>
  );

};

export default React.memo(ReactTimeout(Cooldown));
