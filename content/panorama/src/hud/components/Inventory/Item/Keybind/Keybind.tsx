import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
};

const Keybind = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Keybind rendered");

  const { item, setInterval, clearInterval } = props;

  const [keybind, setKeybind] = useState('');

  useEffect(() => {
    const update = () => setKeybind(Abilities.IsPassive(item) ? '' : Abilities.GetKeybind(item));
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [item, setInterval, clearInterval]);

  return (
    <Label
      style={Styles.Label()}
      text={keybind}
    />
  );

};

export default React.memo(ReactTimeout(Keybind));
