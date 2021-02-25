import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
};

const ManaCost = (props: Props) => {

  const [manaCost, setManaCost] = useState(Abilities.GetManaCost(props.item));

  useEffect(() => {
    const id = props.setInterval(() => {
      setManaCost(Abilities.GetManaCost(props.item));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Label
      className={'inventoryItemManaCostLabel'}
      text={manaCost > 0 ? manaCost.toFixed(0) : ''}
    />
  );

};

export default withReactTimeout(ManaCost);