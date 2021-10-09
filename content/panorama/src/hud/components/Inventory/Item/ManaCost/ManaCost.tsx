import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { Styles } from "./Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
};

const ManaCost = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - ManaCost rendered");

  const { item, setInterval, clearInterval } = props;

  const [manaCost, setManaCost] = useState(Abilities.GetManaCost(item));

  useEffect(() => {
    const update = () => setManaCost(Abilities.GetManaCost(item));
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [item, setInterval, clearInterval]);

  return (
    <Label
      style={Styles.Label()}
      text={manaCost > 0 ? manaCost.toFixed(0) : ''}
    />
  );

};

export default React.memo(ReactTimeout(ManaCost));
