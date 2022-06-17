import React, { useState } from 'react';
import { HUD_THINK_FAST } from '../../../../../App';
import { useInterval } from '../../../../../hooks/useInterval';
import Styles from './styles.module.css';

type Props = {
  buff: BuffID,
  selectedEntityIndex: EntityIndex,
}

const TimedBackground = (props: Props) => {

  const { selectedEntityIndex, buff } = props;

  const [degree, setDegree] = useState(0);

  useInterval(() => {
    const remaining = Math.max(0, Buffs.GetRemainingTime(selectedEntityIndex, buff));
    const duration = Math.max(0, Buffs.GetDuration(selectedEntityIndex, buff));
    const degree = Math.max(0, (remaining / duration) * 360);
    setDegree(Number.isFinite(degree) ? degree : 0);
  }, HUD_THINK_FAST)

  return (
    <React.Fragment>
      <Panel className={Styles.background} />
      <Panel
        className={Styles.border}
        style={{
          washColor: Buffs.IsDebuff(selectedEntityIndex, buff) ? 'rgba(245, 50, 20, 0.95)' : '#8bdd4f',
          clip: 'radial(50% 50%, 0deg, ' + -degree + 'deg)'
        }}
      />
    </React.Fragment>
  );

}

export default TimedBackground;