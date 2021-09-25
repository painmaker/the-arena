import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex
  text: string,
}

const AbilitiesPoints = (props: Props) => {

  const { selectedUnit, text, setInterval, clearInterval } = props;

  const [abilityPoints, setAbilityPoints] = useState(Entities.GetAbilityPoints(selectedUnit));

  useEffect(() => {

    const update = () => {
      setAbilityPoints(Entities.GetAbilityPoints(selectedUnit));
    };

    update();
    const id = setInterval(update, 100);

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
