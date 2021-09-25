import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
};

const Keybind = (props: Props) => {

  const { item, setInterval, clearInterval } = props;

  const [keybind, setKeybind] = useState(Abilities.GetKeybind(item));
  const [isPassive, setIsPassive] = useState(Abilities.IsPassive(item));

  useEffect(() => {

    const update = () => {
      setKeybind(Abilities.GetKeybind(item));
      setIsPassive(Abilities.IsPassive(item));
    };

    update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [item, setInterval, clearInterval]);

  return (
    <Label
      style={Styles.Label()}
      text={isPassive ? '' : keybind}
    />
  );

};

export default withReactTimeout(Keybind);
