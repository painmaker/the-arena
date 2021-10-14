import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import { Styles } from "./Styles";

type Props = {
  item: ItemEntityIndex
};

const Charges = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Charges rendered");

  const { item } = props;

  const [shouldDisplayCharges, setShouldDisplayCharges] = useState(Items.ShouldDisplayCharges(item))
  const [charges, setCharges] = useState(Items.GetCurrentCharges(item))

  useInterval(() => {
    setShouldDisplayCharges(Items.ShouldDisplayCharges(item));
    setCharges(Items.GetCurrentCharges(item));
  }, HUD_THINK_FAST);

  return (
    <React.Fragment>
      {shouldDisplayCharges && (
        <Label style={Styles.Container()} text={charges} />
      )}
    </React.Fragment>
  );

};

export default React.memo(Charges);
