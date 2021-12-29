import React, { useState } from "react";
import { Context, HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import Styles from './styles.module.css';

const Level = () => {

  // $.Msg("REACT-RENDER: Character - Level rendered");

  const { selectedUnit } = React.useContext(Context);

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
    <Panel className={Styles.container}>
      <Label
        className={Styles.label}
        text={'Lvl. ' + level}
      />
      <Panel className={Styles.levelBarContainer}>
        <Panel
          className={Styles.levelBar}
          style={{ width: percentage + "%" }}
        />
      </Panel>
      <Label
        className={Styles.label}
        text={percentage + "%"}
      />
    </Panel>
  );

};

export default React.memo(Level);
