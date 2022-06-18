import React, { useContext, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import AbilityEntityIndexContext from "../../../../context/AbilityEntityIndexContext";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

const Cooldown = () => {

  // $.Msg("REACT-RENDER: AbilityBarItem - Cooldown rendered");

  const { abilityEntityIndex } = useContext(AbilityEntityIndexContext);

  const [degree, setDegree] = useState(0);
  const [cooldownTimeRemaining, setCooldownTimeRemaining] = useState(0);

  useInterval(() => {
    const totalCooldown = Abilities.GetCooldown(abilityEntityIndex);
    const cooldownTimeRemaining = Abilities.GetCooldownTimeRemaining(abilityEntityIndex);
    const degree = Math.min(0, - (cooldownTimeRemaining / totalCooldown) * 360);
    setDegree(Number.isFinite(degree) ? degree : 0)
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
