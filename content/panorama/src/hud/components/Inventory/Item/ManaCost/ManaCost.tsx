import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
};

const ManaCost = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - ManaCost rendered");

  const { item, setInterval, clearInterval } = props;

  const [manaCost, setManaCost] = useState(Abilities.GetManaCost(item));

  useEffect(() => {

    const update = () => {
      setManaCost(Abilities.GetManaCost(item));
    };

    // update();
    const id = setInterval(update, HUD_THINK_FAST);

    return () => clearInterval(id);

  }, [item, setInterval, clearInterval]);

  return (
    <Label
      style={Styles.Label()}
      text={manaCost > 0 ? manaCost.toFixed(0) : ''}
    />
  );

};

export default React.memo(withReactTimeout(ManaCost));
