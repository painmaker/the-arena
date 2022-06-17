import React from "react";
import FilledBackground from "./FilledBackground/FilledBackground";
import TimedBackground from "./TimedBackground/TimedBackground";

type Props = {
  buff: BuffID,
  selectedEntityIndex: EntityIndex,
  isAura: boolean,
}

const Background = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers - TimedBackground rendered");

  const { buff, selectedEntityIndex, isAura } = props;

  return (
    <React.Fragment>
      {isAura && (
        <FilledBackground
          buff={buff}
          selectedEntityIndex={selectedEntityIndex}
        />
      )}
      {!isAura && (
        <TimedBackground
          buff={buff}
          selectedEntityIndex={selectedEntityIndex}
        />
      )}
    </React.Fragment>
  );

};

export default React.memo(Background);
