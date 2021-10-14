import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { Styles } from "./Styles";
import { useInterval } from "../../../../hooks/useInterval";

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
}

const TimedBackground = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers - TimedBackground rendered");

  const { buff, selectedUnit, isDebuff } = props;

  const [degree, setDegree] = useState(0);

  useInterval(() => {
    const remaining = Math.max(0, Buffs.GetRemainingTime(selectedUnit, buff));
    const duration = Math.max(0, Buffs.GetDuration(selectedUnit, buff));
    const degree = Math.max(0, (remaining / duration) * 360);
    setDegree(Number.isFinite(degree) ? degree : 0)
  }, HUD_THINK_FAST)

  return (
    <Panel style={Styles.Container(isDebuff, degree)} />
  );

};

export default React.memo(TimedBackground);
