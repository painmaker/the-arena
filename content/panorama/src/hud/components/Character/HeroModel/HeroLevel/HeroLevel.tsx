import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../../../hooks/useSelectedUnit";

const EXPERIENCE_PER_LEVEL_TABLE: Record<number, number> = {
  1: 0,
  2: 100,
  3: 200,
  4: 300,
  5: 400,
  6: 500,
  7: 600,
  8: 700,
  9: 800,
  10: 900,
  11: 1000,
  12: 1100,
  13: 1200,
  14: 1300,
  15: 1400,
  16: 1500,
  17: 1600,
  18: 1700,
  19: 1800,
  20: 1900,
  21: 2000,
  22: 2100,
  23: 2200,
  24: 2300,
  25: 2400,
  26: 2500,
  27: 2600,
  28: 2700,
  29: 2800,
  30: 2900,
};

type Props = ReactTimeoutProps & {}

const HeroLevel = (props: Props) => {

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [level, setLevel] = useState(Entities.GetLevel(selectedUnit));
  const [totalExperienceGained, setTotalExperienceGained] = useState(Entities.GetCurrentXP(selectedUnit));

  useEffect(() => {
    const id = setInterval(() => {
      setLevel(Entities.GetLevel(selectedUnit));
      setTotalExperienceGained(Entities.GetCurrentXP(selectedUnit));
    }, 100);
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  const maxLevel = Object.keys(EXPERIENCE_PER_LEVEL_TABLE).length;
  const xpGainedThisLevel = totalExperienceGained - EXPERIENCE_PER_LEVEL_TABLE[level];
  const xpRequiredToLevel = EXPERIENCE_PER_LEVEL_TABLE[level === maxLevel ? level : level + 1] - EXPERIENCE_PER_LEVEL_TABLE[level];
  const degree = level !== maxLevel ? ((xpGainedThisLevel / xpRequiredToLevel) * 360) : 360;

  if (Number.isNaN(degree) || !Number.isFinite(degree)) {
    return null;
  }

  return (
    <Panel className={'levelContainer'}>
      <Panel className={"levelCircleContainer"}>
        <Panel className={'levelBackground'} />
        <Panel className={'levelForeground'} style={{ clip: 'radial(50% 50%, 0.0deg, ' + degree + 'deg)' }} />
        <Label className={'levelLabel'} text={level} />
      </Panel>
      <Label className={'levelLabelSubtext'} text={'level'} />
    </Panel>

  );

};

export default withReactTimeout(HeroLevel);
