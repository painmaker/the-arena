import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex
};

const Charges = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Charges rendered");

  const { item, setInterval, clearInterval } = props;

  const [shouldDisplayCharges, setShouldDisplayCharges] = useState(Items.ShouldDisplayCharges(item))
  const [charges, setCharges] = useState(Items.GetCurrentCharges(item))

  useEffect(() => {

    const update = () => {
      setShouldDisplayCharges(Items.ShouldDisplayCharges(item));
      setCharges(Items.GetCurrentCharges(item));
    };

    // update();
    const id = setInterval(update, HUD_THINK_FAST);

    return () => clearInterval(id);

  }, [item, setInterval, clearInterval]);

  return (
    <React.Fragment>
      {shouldDisplayCharges && (
        <Label style={Styles.Container()} text={charges} />
      )}
    </React.Fragment>
  );

};

export default withReactTimeout(Charges);
