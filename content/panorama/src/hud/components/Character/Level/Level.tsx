import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_MEDIUM } from "../../../App";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
}

const Level = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - Level rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [level, setLevel] = useState(Entities.GetLevel(selectedUnit));
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const update = () => {
      if (Entities.IsHero(selectedUnit)) {
        const currentXp = Entities.GetCurrentXP(selectedUnit);
        const requiredXp = Entities.GetNeededXPToLevel(selectedUnit);
        const degree = Math.floor(Math.max(0, Math.min(360, currentXp / requiredXp * 360)));
        setDegree(Number.isNaN(degree) ? 360 : degree);
      } else {
        setDegree(360);
      }
      setLevel(Entities.GetLevel(selectedUnit));
    };
    const id = setInterval!(update, HUD_THINK_MEDIUM);
    return () => clearInterval!(id);
  }, [selectedUnit, setInterval, clearInterval]);

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

export default React.memo(ReactTimeout(Level));
