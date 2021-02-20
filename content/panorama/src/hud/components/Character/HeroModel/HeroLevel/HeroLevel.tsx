import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";

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
};

type Props = ReactTimeoutProps & {}

const HeroLevel = (props: Props) => {

  const [level, setLevel] = useState(Entities.GetLevel(Players.GetLocalPlayerPortraitUnit()));
  const [totalExperienceGained, setTotalExperienceGained] = useState(Entities.GetCurrentXP(Players.GetLocalPlayerPortraitUnit()));

  useEffect(() => {
    const id = props.setInterval(() => {
      setLevel(Entities.GetLevel(Players.GetLocalPlayerPortraitUnit()));
      setTotalExperienceGained(Entities.GetCurrentXP(Players.GetLocalPlayerPortraitUnit()));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

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
