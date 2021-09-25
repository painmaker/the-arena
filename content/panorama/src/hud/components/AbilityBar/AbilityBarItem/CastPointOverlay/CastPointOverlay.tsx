import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
}

const Cooldown = (props: Props) => {

  $.Msg("REACT-RENDER: AbilityBarItem - CastPointOveraly rendered");

  const { ability, setInterval, clearInterval } = props;

  const [castPoint, setCastPoint] = useState(Math.max(0, Abilities.GetCastPoint(ability)));
  const [isInAbilityPhase, setIsInAbilityPhase] = useState(Abilities.IsInAbilityPhase(ability));
  const [degree, setDegree] = useState(0);

  useEffect(() => {

    const update = () => {
      setCastPoint(Math.max(0, Abilities.GetCastPoint(ability)));
      setIsInAbilityPhase(Abilities.IsInAbilityPhase(ability));
    };

    // update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [ability, setInterval, clearInterval]);

  useEffect(() => {
    let id = -1;
    if (isInAbilityPhase) {
      const offsetCastPoint = Math.max(0, castPoint > 0.1 ? castPoint - 0.1 : castPoint);
      const endtime = Game.GetGameTime() + offsetCastPoint;
      const update = () => {
        const gameTimeDifference = endtime - Game.GetGameTime();
        const degree = Math.min(0, -(360 - ((gameTimeDifference / offsetCastPoint) * 360)));
        setDegree(Number.isNaN(degree) || !Number.isFinite(degree) ? 0 : Math.round(degree));
      };
      // update();
      id = setInterval(update, HUD_THINK);
    } else {
      setDegree(0)
    }
    return () => clearInterval(id);
  }, [isInAbilityPhase, castPoint, setInterval, clearInterval])

  return (
    <Panel style={Styles.Container(degree)} />
  );

};

export default withReactTimeout(Cooldown);
