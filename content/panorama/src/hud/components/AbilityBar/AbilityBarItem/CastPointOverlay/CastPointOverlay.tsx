import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from "./styles.module.css";

type Props = {
  ability: AbilityEntityIndex,
}

const CastPointOverlay = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - CastPointOveraly rendered");

  const { ability } = props;

  const [castPoint, setCastPoint] = useState(Math.max(0.1, Abilities.GetCastPoint(ability) - 0.1));
  const [isInAbilityPhase, setIsInAbilityPhase] = useState(Abilities.IsInAbilityPhase(ability));
  const [endTime, setEndTime] = useState<number | undefined>(undefined);

  const [degree, setDegree] = useState(0);

  useEffect(() => {
    if (isInAbilityPhase) {
      setEndTime(Game.GetGameTime() + castPoint)
    } else {
      setEndTime(undefined);
    }
  }, [isInAbilityPhase, castPoint])

  useInterval(() => {
    setCastPoint(Math.max(0.1, Abilities.GetCastPoint(ability) - 0.1));
    setIsInAbilityPhase(Abilities.IsInAbilityPhase(ability));
    if (endTime && castPoint) {
      const gameTimeDifference = endTime - Game.GetGameTime();
      const degree = - (360 - ((gameTimeDifference / castPoint) * 360));
      setDegree(degree ? Math.round(degree) : 0);
    } else {
      setDegree(0)
    }
  }, HUD_THINK_FAST);

  if (degree === 0) {
    return null;
  }

  return (
    <Panel
      className={Styles.container}
      style={{ clip: 'radial(50% 50%, 360deg, ' + degree + 'deg)' }}
    />
  );

};

export default React.memo(CastPointOverlay);
