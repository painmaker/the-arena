import React, { useContext, useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import AbilityEntityIndexContext from "../../../../context/AbilityContext";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from "./styles.module.css";
import lodash from 'lodash';

const CastPointOverlay = () => {

  // $.Msg("REACT-RENDER: AbilityBarItem - CastPointOveraly rendered");

  const { abilityEntityIndex } = useContext(AbilityEntityIndexContext);

  const [castPoint, setCastPoint] = useState(Math.max(0.1, Abilities.GetCastPoint(abilityEntityIndex) - 0.1));
  const [isInAbilityPhase, setIsInAbilityPhase] = useState(Abilities.IsInAbilityPhase(abilityEntityIndex));
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
    const castPoint = Math.max(0.1, Abilities.GetCastPoint(abilityEntityIndex) - 0.1);
    setCastPoint(castPoint);
    setIsInAbilityPhase(Abilities.IsInAbilityPhase(abilityEntityIndex));
    if (endTime !== undefined) {
      const gameTimeDifference = endTime - Game.GetGameTime();
      const degree = - (360 - ((gameTimeDifference / castPoint) * 360));
      setDegree(lodash.isFinite(degree) ? Math.round(degree) : 0);
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
