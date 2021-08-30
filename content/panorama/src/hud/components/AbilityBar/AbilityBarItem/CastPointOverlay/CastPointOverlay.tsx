import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  abilityEntityIndex: AbilityEntityIndex,
}

const Cooldown = (props: Props) => {

  const [castPoint, setCastPoint] = useState(Math.max(0, Abilities.GetCastPoint(props.abilityEntityIndex)));
  const [isInAbilityPhase, setIsInAbilityPhase] = useState(Abilities.IsInAbilityPhase(props.abilityEntityIndex));
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const id = props.setInterval(() => {
      setCastPoint(Math.max(0, Abilities.GetCastPoint(props.abilityEntityIndex)));
      setIsInAbilityPhase(Abilities.IsInAbilityPhase(props.abilityEntityIndex));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  useEffect(() => {
    let id = -1;
    if (isInAbilityPhase) {
      const offsetCastPoint = Math.max(0, castPoint > 0.1 ? castPoint - 0.1 : castPoint);
      const endtime = Game.GetGameTime() + offsetCastPoint;
      id = props.setInterval(() => {
        const gameTimeDifference = endtime - Game.GetGameTime();
        const degree = Math.min(0, - (360 - ((gameTimeDifference / offsetCastPoint) * 360)))
        setDegree(Number.isNaN(degree) || !Number.isFinite(degree) ? 0 : Math.round(degree));
      }, 1);
    } else {
      setDegree(0)
    }
    return () => props.clearInterval(id);
  }, [isInAbilityPhase, castPoint])

  return (
    <Panel style={Styles.Container(degree)} />
  );

};

export default withReactTimeout(Cooldown);
