import React, { useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './level.module.css';
import ParentStyles from './../stats.module.css';

type Props = {
  selectedUnit: EntityIndex,
}

const Level = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - Level rendered");

  const { selectedUnit } = props;

  const [level, setLevel] = useState(1);
  const [percentage, setPercentage] = useState(0);

  useInterval(() => {
    if (Entities.IsHero(selectedUnit)) {
      const currentXp = Entities.GetCurrentXP(selectedUnit);
      const requiredXp = Entities.GetNeededXPToLevel(selectedUnit);
      const percentage = Math.floor(Math.max(0, Math.min(100, currentXp / requiredXp * 100)))
      setPercentage(percentage ? percentage : 0)
    } else {
      setPercentage(100);
    }
    setLevel(Entities.GetLevel(selectedUnit));
  }, HUD_THINK_MEDIUM);

  return (
    <React.Fragment>
      <Panel className={ParentStyles.entry}>
        <Label
          className={ParentStyles.label}
          text={'Lvl. ' + level}
        />
        <Panel className={Styles.levelBarContainer}>
          <Panel
            className={Styles.levelBar}
            style={{ width: percentage + "%" }}
          />
        </Panel>
        <Label
          className={`${Styles.levelPctLabel} ${ParentStyles.label}`}
          text={percentage + "%"}
        />
      </Panel>
    </React.Fragment>
  );

};

export default React.memo(Level);
