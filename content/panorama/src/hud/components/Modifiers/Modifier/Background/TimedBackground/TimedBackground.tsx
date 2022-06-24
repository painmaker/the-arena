import React, { useState } from 'react';
import { HUD_THINK_FAST } from '../../../../../App';
import { useInterval } from '../../../../../hooks/useInterval';
import Styles from './styles.module.css';

type Props = {
  modifier: BuffID,
  selectedEntityIndex: EntityIndex,
}

const TimedBackground = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers - TimedBackground rendered");

  const { selectedEntityIndex, modifier } = props;

  const [degree, setDegree] = useState(0);

  useInterval(() => {
    const remaining = Math.max(0, Buffs.GetRemainingTime(selectedEntityIndex, modifier));
    const duration = Math.max(0, Buffs.GetDuration(selectedEntityIndex, modifier));
    const degree = Math.floor((remaining / duration) * 360);
    setDegree(Number.isFinite(degree) && !Number.isNaN(degree) ? degree : 0);
  }, HUD_THINK_FAST)

  return (
    <React.Fragment>
      <Panel className={Styles.background} />
      <Panel
        className={Styles.border}
        style={{
          washColor: Buffs.IsDebuff(selectedEntityIndex, modifier) ? 'rgba(245, 50, 20, 0.95)' : '#8bdd4f',
          clip: 'radial(50% 50%, 0deg, ' + -degree + 'deg)'
        }}
      />
    </React.Fragment>
  );

}

export default React.memo(TimedBackground);