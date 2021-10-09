import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
}

const CastPointOverlay = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - CastPointOveraly rendered");

  const { ability, setInterval, clearInterval } = props;

  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const offsetCastPoint = Math.max(0.1, Abilities.GetCastPoint(ability) - 0.1);
    const endtime = Game.GetGameTime() + offsetCastPoint;
    const update = () => {
      const gameTimeDifference = endtime - Game.GetGameTime();
      const degree = Math.min(0, -(360 - ((gameTimeDifference / offsetCastPoint) * 360)));
      setDegree(Number.isNaN(degree) || !Number.isFinite(degree) ? 0 : Math.round(degree));
    };
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [ability, setInterval, clearInterval]);

  if (degree === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container(degree)} />
  );

};

export default React.memo(ReactTimeout(CastPointOverlay));
