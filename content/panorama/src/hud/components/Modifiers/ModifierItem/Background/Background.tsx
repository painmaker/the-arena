import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {
  buffId: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
}

const ModifierAuraBackground = (props: Props) => {

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
    <Panel
      className={'modifierItemAuraBackground'}
      style={{
        backgroundColor: props.isDebuff ? 'red' : 'greenyellow',
        clip: Number.isNaN(degree) ? null : 'radial(50% 50%, 0deg, ' + -degree + 'deg)'
      }}
    />
  );

};

export default withReactTimeout(ModifierAuraBackground);
