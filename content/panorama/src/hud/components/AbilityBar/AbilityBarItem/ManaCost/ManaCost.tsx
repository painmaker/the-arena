import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_FAST } from "../../../../App";

type Props = ReactTimeoutProps & {
  ability: AbilityEntityIndex,
}

const ManaCost = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - ManaCost rendered");

  const { ability, setInterval, clearInterval } = props;

  const [manaCost, setManaCost] = useState(0);

  useEffect(() => {
    const update = () => setManaCost(Abilities.GetManaCost(ability));
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [ability, setInterval, clearInterval])

  if (manaCost === 0) {
    return null;
  }

  return (
    <Panel style={Styles.Container()}>
      <Label style={Styles.Label()} text={manaCost} />
    </Panel>
  );

};

export default React.memo(ReactTimeout(ManaCost));
