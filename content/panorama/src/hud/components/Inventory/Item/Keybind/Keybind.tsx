import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import { Styles } from "./Styles";

type Props = {
  item: ItemEntityIndex,
};

const Keybind = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Keybind rendered");

  const { item } = props;

  const [keybind, setKeybind] = useState('');

  useInterval(() => {
    setKeybind(Abilities.IsPassive(item) ? '' : Abilities.GetKeybind(item));
  }, HUD_THINK_FAST);

  return (
    <Label
      style={Styles.Label()}
      text={keybind}
    />
  );

};

export default React.memo(Keybind);
