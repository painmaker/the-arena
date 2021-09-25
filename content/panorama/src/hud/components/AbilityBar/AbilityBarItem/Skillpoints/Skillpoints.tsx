import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex
}

const Skillpoints = (props: Props) => {

  $.Msg("REACT-RENDER: AbilityBarItem - Skillpoints rendered");

  const { ability, setInterval, clearInterval } = props;

  const [abilityLevel, setAbilityLevel] = useState(Abilities.GetLevel(ability));
  const [maxAbilityLevel, setMaxAbilityLevel] = useState(Abilities.GetMaxLevel(ability));

  useEffect(() => {

    const update = () => {
      setAbilityLevel(Abilities.GetLevel(ability));
      setMaxAbilityLevel(Abilities.GetMaxLevel(ability));
    };

    // update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [ability, setInterval, clearInterval]);

  return (
    <Panel style={Styles.Container()}>
      {Array.from({ length: maxAbilityLevel }, (_, index) => index + 1).map(index => {
        const columnWidth = 100 / maxAbilityLevel;
        return (
          <Panel
            key={ability + '_level_' + index}
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
