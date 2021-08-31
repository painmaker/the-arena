import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex
};

const Charges = (props: Props) => {

  const [shouldDisplayCharges, setShouldDisplayCharges] = useState(Items.ShouldDisplayCharges(props.item))
  const [charges, setCharges] = useState(Items.GetCurrentCharges(props.item))

  useEffect(() => {
    const id = props.setInterval(() => {
      setShouldDisplayCharges(Items.ShouldDisplayCharges(props.item));
      setCharges(Items.GetCurrentCharges(props.item));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <React.Fragment>
      {shouldDisplayCharges && (
        <Label style={Styles.Container()} text={charges} />
      )}
    </React.Fragment>
  );

};

export default withReactTimeout(Charges);
