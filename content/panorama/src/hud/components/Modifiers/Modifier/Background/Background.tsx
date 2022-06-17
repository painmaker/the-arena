import React from "react";
import FilledBackground from "./FilledBackground/FilledBackground";
import TimedBackground from "./TimedBackground/TimedBackground";

type Props = {
  modifier: BuffID,
  selectedEntityIndex: EntityIndex,
  isAura: boolean,
}

const Background = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers - Background rendered");

  const { modifier, selectedEntityIndex, isAura } = props;

  return (
    <React.Fragment>
      {isAura && (
        <FilledBackground
          modifier={modifier}
          selectedEntityIndex={selectedEntityIndex}
        />
      )}
      {!isAura && (
        <TimedBackground
          modifier={modifier}
          selectedEntityIndex={selectedEntityIndex}
        />
      )}
    </React.Fragment>
  );

};

export default React.memo(Background);
