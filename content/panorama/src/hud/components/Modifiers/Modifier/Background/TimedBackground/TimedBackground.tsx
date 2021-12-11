import React, { useState } from 'react';
import { HUD_THINK_FAST } from '../../../../../App';
import { useInterval } from '../../../../../hooks/useInterval';
import Styles from './styles.module.css';

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex,
}

const TimedBackground = (props: Props) => {

  const { selectedUnit, buff } = props;

  const [degree, setDegree] = useState(0);

  useInterval(() => {
    const remaining = Math.max(0, Buffs.GetRemainingTime(selectedUnit, buff));
    const duration = Math.max(0, Buffs.GetDuration(selectedUnit, buff));
    const degree = Math.max(0, (remaining / duration) * 360);
    setDegree(Number.isFinite(degree) ? degree : 0);
  }, HUD_THINK_FAST)

  return (
    <Panel
      className={Styles.container}
      style={{
        backgroundColor: Buffs.IsDebuff(selectedUnit, buff) ? 'rgba(195, 40, 40, 0.9)' : 'rgba(0, 200, 20, 0.9)',
        clip: 'radial(50% 50%, 0deg, ' + -degree + 'deg)'
      }}
    />
  )

}

export default TimedBackground;