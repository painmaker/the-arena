import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
};

const Keybind = (props: Props) => {

  const [keybind, setKeybind] = useState(Abilities.GetKeybind(props.item));
  const [isPassive, setIsPassive] = useState(Abilities.IsPassive(props.item));

  useEffect(() => {
    const id = props.setInterval(() => {
      setKeybind(Abilities.GetKeybind(props.item));
      setIsPassive(Abilities.IsPassive(props.item));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Label
      style={Styles.Label()}
      text={isPassive ? '' : keybind}
    />
  );

};

export default withReactTimeout(Keybind);
