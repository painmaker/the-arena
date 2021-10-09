import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import { Styles as ParentStyles } from "../Styles";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

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
    const id = setInterval!(update, HUD_THINK_MEDIUM);
    return () => clearInterval!(id);
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

export default React.memo(ReactTimeout(Level));
