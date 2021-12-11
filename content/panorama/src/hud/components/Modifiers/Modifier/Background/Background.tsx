import React from "react";
import FilledBackground from "./FilledBackground/FilledBackground";
import TimedBackground from "./TimedBackground/TimedBackground";

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex,
  isAura: boolean,
}

const Background = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers - TimedBackground rendered");

  const { buff, selectedUnit, isAura } = props;

  return (
    <React.Fragment>
      {isAura && (
        <FilledBackground
          buff={buff}
          selectedUnit={selectedUnit}
        />
      )}
      {!isAura && (
        <TimedBackground
          buff={buff}
          selectedUnit={selectedUnit}
        />
      )}
    </React.Fragment>
  );

};

export default React.memo(Background);
