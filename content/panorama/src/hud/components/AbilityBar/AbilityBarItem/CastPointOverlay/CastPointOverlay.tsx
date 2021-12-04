import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from "./styles.module.css";

type Props = {
  castPoint: number;
  endTime: number,
}

const CastPointOverlay = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - CastPointOveraly rendered");

  const { castPoint, endTime } = props;

  const [degree, setDegree] = useState(0);

  useInterval(() => {
    const gameTimeDifference = endTime - Game.GetGameTime();
    const degree = Math.min(0, -(360 - ((gameTimeDifference / castPoint) * 360)));
    setDegree(Number.isNaN(degree) || !Number.isFinite(degree) ? 0 : Math.round(degree));
  }, HUD_THINK_FAST);

  if (degree === 0) {
    return null;
  }

  return (
    <Panel
      className={Styles.container}
      style={{ clip: 'radial(50% 50%, 0deg, ' + degree + 'deg)' }}
    />
  );

};

export default React.memo(CastPointOverlay);
