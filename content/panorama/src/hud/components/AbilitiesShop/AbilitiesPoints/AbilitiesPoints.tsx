import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  entindex: EntityIndex
  text: string,
}

const AbilitiesPoints = (props: Props) => {

  const { entindex, text, setInterval, clearInterval } = props;

  const [abilityPoints, setAbilityPoints] = useState(Entities.GetAbilityPoints(entindex));

  useEffect(() => {
    const id = setInterval(() => {
      setAbilityPoints(Entities.GetAbilityPoints(entindex));
    }, 100);
    return () => clearInterval(id);
  }, [entindex, setInterval, clearInterval]);

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
