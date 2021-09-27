import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex
  text: string,
}

const AbilitiesPoints = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilitiesShop - AbilitiesPoints rendered");

  const { selectedUnit, text, setInterval, clearInterval } = props;

  const [abilityPoints, setAbilityPoints] = useState(Entities.GetAbilityPoints(selectedUnit));

  useEffect(() => {

    const update = () => {
      setAbilityPoints(Entities.GetAbilityPoints(selectedUnit));
    };

    // update();
    const id = setInterval(update, HUD_THINK_MEDIUM);

    return () => clearInterval(id);

  }, [selectedUnit, setInterval, clearInterval]);

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

export default withReactTimeout(AbilitiesPoints);
