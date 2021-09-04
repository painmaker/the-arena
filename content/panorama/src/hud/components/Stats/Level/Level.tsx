import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles as ParentStyles } from "../Styles";
import { Styles } from "./Styles";

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

const Level = (props: Props) => {

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
  const pct = (xpGainedThisLevel / xpRequiredToLevel) * 100;

  return (
    <Panel style={ParentStyles.Entry()}>
      <Label
        style={Styles.LevelLabel()}
        text={'Lvl. ' + level}
      />
      <Panel style={Styles.LevelbarContainer()}>
        <Panel style={Styles.Levelbar(Number.isFinite(pct) ? pct : 100)} />
      </Panel>
      <Label
        style={Styles.LevelPctLabel()}
        text={Number.isFinite(pct) ? pct + "%" : '100%'}
      />
    </Panel>
  );

};

export default withReactTimeout(Level);
