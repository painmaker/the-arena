import React, { useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import { Styles } from "./Styles";

type Props = {
  selectedUnit: EntityIndex
  text: string,
}

const AbilitiesPoints = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilitiesShop - AbilitiesPoints rendered");

  const { selectedUnit, text } = props;

  const [abilityPoints, setAbilityPoints] = useState(Entities.GetAbilityPoints(selectedUnit));

  useInterval(() => {
    setAbilityPoints(Entities.GetAbilityPoints(selectedUnit));
  }, HUD_THINK_MEDIUM);

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.LabelContainer()}>
        <Label
          text={text}
          style={Styles.TextLabel()}
        />
        <Label
          text={abilityPoints}
          style={Styles.NumberLabel(abilityPoints !== 0)}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(AbilitiesPoints);
