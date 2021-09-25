import React from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
  washColor: string,
  saturation: string,
}

const AbilityImage = (props: Props) => {

  const { washColor, saturation, ability } = props;

  return (
    <Panel style={Styles.Container()}>
      <DOTAAbilityImage
        style={Styles.AbilityImage(washColor, saturation)}
        contextEntityIndex={ability}
      />
    </Panel>
  );

};

export default withReactTimeout(AbilityImage);
