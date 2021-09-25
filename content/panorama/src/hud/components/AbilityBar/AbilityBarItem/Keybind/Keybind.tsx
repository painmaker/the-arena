import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
  isTrainable: boolean,
  isPassive: boolean,
}

const Keybind = (props: Props) => {

  $.Msg("REACT-RENDER: AbilityBarItem - Keybind rendered");

  const { ability, setInterval, clearInterval } = props;

  const [keybind, setKeybind] = useState(Abilities.GetKeybind(ability));

  useEffect(() => {

    const update = () => {
      setKeybind(Abilities.GetKeybind(ability));
    };

    // update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [ability, setInterval, clearInterval]);

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
