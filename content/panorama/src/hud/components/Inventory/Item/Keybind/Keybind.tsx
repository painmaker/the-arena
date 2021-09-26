import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
};

const Keybind = (props: Props) => {

  $.Msg("REACT-RENDER: Inventory - Keybind rendered");

  const { item, setInterval, clearInterval } = props;

  const [keybind, setKeybind] = useState(Abilities.GetKeybind(item));

  useEffect(() => {

    const update = () => {
      setKeybind(Abilities.IsPassive(item) ? '' : Abilities.GetKeybind(item));
    };

    update();
    const id = setInterval(update, HUD_THINK_FAST);

    return () => clearInterval(id);

  }, [item, setInterval, clearInterval]);

  return (
    <Label
      style={Styles.Label()}
      text={keybind}
    />
  );

};

export default withReactTimeout(Keybind);
