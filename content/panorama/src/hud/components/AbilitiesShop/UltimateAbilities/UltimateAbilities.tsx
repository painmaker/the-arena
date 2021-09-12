import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import AbilityImage from "../AbilityImage/AbilityImage";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  entindex: EntityIndex
  abilitynames: string[],
}

const UltimateAbilities = (props: Props) => {
  return (
    <Panel style={Styles.Container()}>
      <Label
        text={'Ultimate Abilities'}
        style={Styles.Title()}
      />
      <Panel style={Styles.AbilitiesContainer()}>
        {props.abilitynames.map(abilityname => {
          return (
            <AbilityImage
              key={abilityname}
              entindex={props.entindex}
              abilityname={abilityname}
            />
          )
        })}
      </Panel>
    </Panel>
  );
};

export default withReactTimeout(UltimateAbilities);
