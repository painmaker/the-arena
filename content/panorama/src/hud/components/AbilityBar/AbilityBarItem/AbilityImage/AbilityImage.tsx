import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  abilityEntityIndex: AbilityEntityIndex,
  washColor: string,
  saturation: string,
}

const AbilityImage = (props: Props) => {

  const [texture, setTexture] = useState(Abilities.GetAbilityTextureName(props.abilityEntityIndex))

  useEffect(() => {
    const id = props.setInterval(() => {
      setTexture(Abilities.GetAbilityTextureName(props.abilityEntityIndex));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel style={Styles.Container()}>
      <DOTAAbilityImage
        style={Styles.AbilityImage(props.washColor, props.saturation)}
        contextEntityIndex={props.abilityEntityIndex}
      />
    </Panel>
  );
};

export default withReactTimeout(AbilityImage);
