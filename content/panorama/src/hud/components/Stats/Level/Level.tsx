import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
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

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
}

const Level = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - Level rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [level, setLevel] = useState(Entities.GetLevel(selectedUnit));
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {

    const update = () => {

      if (Entities.IsHero(selectedUnit)) {
        const currentXp = Entities.GetCurrentXP(selectedUnit);
        const requiredXp = Entities.GetNeededXPToLevel(selectedUnit);
        const percentage = Math.floor(Math.max(0, Math.min(100, currentXp / requiredXp * 100)))
        setPercentage(Number.isNaN(percentage) ? 100 : percentage)
      } else {
        setPercentage(100);
      }

      setLevel(Entities.GetLevel(selectedUnit));

    };

    // update();
    const id = setInterval(update, HUD_THINK_MEDIUM);

    return () => clearInterval(id);

  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <React.Fragment>
      <Panel style={ParentStyles.Entry()}>
        <Label
          style={Styles.LevelLabel()}
          text={'Lvl. ' + level}
        />
        <Panel style={Styles.LevelbarContainer()}>
          <Panel style={Styles.Levelbar(percentage)} />
        </Panel>
        <Label
          style={Styles.LevelPctLabel()}
          text={Number.isFinite(percentage) ? percentage + "%" : '100%'}
        />
      </Panel>
    </React.Fragment>
  );

};

export default React.memo(withReactTimeout(Level));
