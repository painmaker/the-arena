import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

type Props = {
  ability: AbilityEntityIndex,
}

const Cooldown = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Cooldown rendered");

  const { ability } = props;

  const [degree, setDegree] = useState(0);
  const [cooldownTimeRemaining, setCooldownTimeRemaining] = useState(0);

  useInterval(() => {
    const totalCooldown = Abilities.GetCooldown(ability);
    const cooldownTimeRemaining = Abilities.GetCooldownTimeRemaining(ability);
    const degree = Math.min(0, - (cooldownTimeRemaining / totalCooldown) * 360);
    if (Number.isNaN(degree) || !Number.isFinite(degree)) {
      setDegree(0)
    } else {
      setDegree(degree);
    }
    setCooldownTimeRemaining(cooldownTimeRemaining);
  }, HUD_THINK_FAST);

  if (cooldownTimeRemaining === 0) {
    return null;
  }

  return (
    <Panel className={Styles.container}>
      <Panel
        className={Styles.background}
        style={{ clip: 'radial(50% 50%, 0deg, ' + degree + 'deg)' }}
      />
      <Label
        className={Styles.label}
        text={Math.ceil(cooldownTimeRemaining)}
      />
    </Panel>
  );

};

export default React.memo(Cooldown);
