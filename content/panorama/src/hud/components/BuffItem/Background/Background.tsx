import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {
  buffId: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
}

const Background = (props: Props) => {

  const [remaining, setRemaining] = useState(Math.max(0, Buffs.GetRemainingTime(props.selectedUnit, props.buffId)));
  const [duration, setDuration] = useState(Math.max(0, Buffs.GetDuration(props.selectedUnit, props.buffId)));

  useEffect(() => {
    const id = props.setInterval(() => {
      setRemaining(Math.max(0, Buffs.GetRemainingTime(props.selectedUnit, props.buffId)));
      setDuration(Math.max(0, Buffs.GetDuration(props.selectedUnit, props.buffId)));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  const degree = Math.max(0, (remaining / duration) * 360);

  return (
    <Panel
      className={'sharedBuffAuraBackground'}
      style={{
        backgroundColor: props.isDebuff ? 'red' : 'greenyellow',
        clip: Number.isNaN(degree) ? null : 'radial(50% 50%, 0deg, ' + degree + 'deg)'
      }}
    />
  );

};

export default withReactTimeout(Background);
