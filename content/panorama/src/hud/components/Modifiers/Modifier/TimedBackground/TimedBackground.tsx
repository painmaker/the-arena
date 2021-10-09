import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  buff: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
}

const TimedBackground = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers - TimedBackground rendered");

  const { buff, selectedUnit, isDebuff, setInterval, clearInterval } = props;

  const [remaining, setRemaining] = useState(Math.max(0, Buffs.GetRemainingTime(selectedUnit, buff)));
  const [duration, setDuration] = useState(Math.max(0, Buffs.GetDuration(selectedUnit, buff)));

  useEffect(() => {
    const update = () => {
      setRemaining(Math.max(0, Buffs.GetRemainingTime(selectedUnit, buff)));
      setDuration(Math.max(0, Buffs.GetDuration(selectedUnit, buff)));
    };
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [buff, selectedUnit, setInterval, clearInterval]);

  let degree = Math.max(0, (remaining / duration) * 360);
  if (Number.isNaN(degree) || !Number.isFinite(degree)) {
    degree = 0;
  }

  return (
    <Panel style={Styles.Container(isDebuff, degree)} />
  );

};

export default React.memo(ReactTimeout(TimedBackground));
