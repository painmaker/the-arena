import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import FilledBackground from "./FilledBackground/FilledBackground";
import TimedBackground from "./TimedBackground/TimedBackground";

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
  isAura: boolean,
}

const Background = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers - TimedBackground rendered");

  const { buff, selectedUnit, isDebuff, isAura } = props;

  return (
    <React.Fragment>
      {isAura && (
        <FilledBackground
          isDebuff={isDebuff}
        />
      )}
      {!isAura && (
        <TimedBackground
          isDebuff={isDebuff}
          buff={buff}
          selectedUnit={selectedUnit}
        />
      )}
    </React.Fragment>
  );

};

export default React.memo(Background);
