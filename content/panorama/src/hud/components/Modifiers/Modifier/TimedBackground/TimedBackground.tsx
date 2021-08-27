import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  buffId: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
}

const TimedBackground = (props: Props) => {

  const [remaining, setRemaining] = useState(Math.max(0, Buffs.GetRemainingTime(props.selectedUnit, props.buffId)));
  const [duration, setDuration] = useState(Math.max(0, Buffs.GetDuration(props.selectedUnit, props.buffId)));

  useEffect(() => {
    const id = props.setInterval(() => {
      setRemaining(Math.max(0, Buffs.GetRemainingTime(props.selectedUnit, props.buffId)));
      setDuration(Math.max(0, Buffs.GetDuration(props.selectedUnit, props.buffId)));
    }, 50);
    return () => props.clearInterval(id);
  }, []);

  let degree = Math.max(0, (remaining / duration) * 360);
  if (Number.isNaN(degree) || !Number.isFinite(degree)) {
    degree = 0;
  }

  return (
    <Panel style={Styles.Container(props.isDebuff, degree)} />
  );

};

export default withReactTimeout(TimedBackground);
