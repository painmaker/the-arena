import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  abilityEntityIndex: AbilityEntityIndex,
  isTrainable: boolean,
  isPassive: boolean,
}

const Keybind = (props: Props) => {

  const [keybind, setKeybind] = useState(Abilities.GetKeybind(props.abilityEntityIndex));

  useEffect(() => {
    const id = props.setInterval(() => {
      setKeybind(Abilities.GetKeybind(props.abilityEntityIndex));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  if (!props.isTrainable && props.isPassive) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Label style={Styles.Label()} text={keybind} />
    </Panel>
  );

};

export default withReactTimeout(Keybind);
