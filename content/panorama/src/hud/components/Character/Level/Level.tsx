import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
}

const Level = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - Level rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [level, setLevel] = useState(Entities.GetLevel(selectedUnit));
  const [degree, setDegree] = useState(Entities.GetLevel(selectedUnit));

  useEffect(() => {
    const id = setInterval(() => {

      if (Entities.IsHero(selectedUnit)) {
        const currentXp = Entities.GetCurrentXP(selectedUnit);
        const requiredXp = Entities.GetNeededXPToLevel(selectedUnit);
        const degree = currentXp / requiredXp * 360
        setDegree(Math.floor(Math.max(0, Math.min(360, degree))));
      } else {
        setDegree(360);
      }

      setLevel(Entities.GetLevel(selectedUnit));

    }, HUD_THINK_MEDIUM);
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.CircleContainer()}>
        <Panel style={Styles.CircleBackground()} />
        <Panel style={Styles.CircleForeground(degree)} />
        <Label style={Styles.CircleLevelLabel()} text={level} />
      </Panel>
      <Label style={Styles.LevelLabel()} text={'level'} />
    </Panel>
  );

};

export default withReactTimeout(Level);
