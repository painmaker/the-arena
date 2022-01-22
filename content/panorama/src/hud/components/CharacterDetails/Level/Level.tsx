import React, { useState } from "react";
import { Styles } from "./Styles";
import { HUD_THINK_MEDIUM, SelectedUnitContext } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";

const Level = () => {

  // $.Msg("REACT-RENDER: Character - Level rendered");

  const { selectedUnit } = React.useContext(SelectedUnitContext);

  const [level, setLevel] = useState(Entities.GetLevel(selectedUnit));
  const [degree, setDegree] = useState(0);

  useInterval(() => {
    if (Entities.IsHero(selectedUnit)) {
      const currentXp = Entities.GetCurrentXP(selectedUnit);
      const requiredXp = Entities.GetNeededXPToLevel(selectedUnit);
      const degree = Math.floor(Math.max(0, Math.min(360, currentXp / requiredXp * 360)));
      setDegree(Number.isNaN(degree) ? 360 : degree);
    } else {
      setDegree(360);
    }
    setLevel(Entities.GetLevel(selectedUnit));
  }, HUD_THINK_MEDIUM);

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.CircleContainer()}>
        <Panel style={Styles.CircleBackground()} />
        <Panel className={'EmptyCircle'} style={Styles.CircleForeground(degree)} />
        <Label style={Styles.CircleLevelLabel()} text={level} />
      </Panel>
      <Label style={Styles.LevelLabel()} text={'level'} />
    </Panel>
  );

};

export default React.memo(Level);
