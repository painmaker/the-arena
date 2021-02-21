import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
};

const Hotkey = (props: Props) => {

  const [hotkey, setHotkey] = useState(Abilities.GetKeybind(props.item));
  const [isPassive, setIsPassive] = useState(Abilities.IsPassive(props.item));

  useEffect(() => {
    const id = props.setInterval(() => {
      setHotkey(Abilities.GetKeybind(props.item));
      setIsPassive(Abilities.IsPassive(props.item));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Label className={'inventoryHotKeyLabel'} text={isPassive ? '' : hotkey} />
  );

};

export default withReactTimeout(Hotkey);
