import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  abilityEntityIndex: AbilityEntityIndex
}

const Skillpoints = (props: Props) => {

  const [abilityLevel, setAbilityLevel] = useState(Abilities.GetLevel(props.abilityEntityIndex));
  const [maxAbilityLevel, setMaxAbilityLevel] = useState(Abilities.GetMaxLevel(props.abilityEntityIndex));

  useEffect(() => {
    const id = props.setInterval(() => {
      setAbilityLevel(Abilities.GetLevel(props.abilityEntityIndex));
      setMaxAbilityLevel(Abilities.GetMaxLevel(props.abilityEntityIndex));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel style={Styles.Container()}>
      {Array.from({ length: maxAbilityLevel }, (_, index) => index + 1).map(index => {
        const columnWidth = 100 / maxAbilityLevel;
        return (
          <Panel
            key={props.abilityEntityIndex + '_level_' + index}
            style={Styles.Column(columnWidth)}
          >
            <Panel style={Styles.Skillpoint(abilityLevel, index)} />
          </Panel>
        )
      })}
    </Panel>
  );

};

export default withReactTimeout(Skillpoints);
