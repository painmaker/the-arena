import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";

type Props = ReactTimeoutProps & {};

const MagicResistance = (props: Props) => {

  const [magicResistance, setMagicResistance] = useState(
    Entities.GetMagicalArmorValue(Players.GetLocalPlayerPortraitUnit())
  );

  useEffect(() => {
    const id = props.setInterval(() => {
      setMagicResistance(Entities.GetMagicalArmorValue(Players.GetLocalPlayerPortraitUnit()));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel style={ParentStyles.Entry()}>
      <Panel style={Styles.Image()} />
      <Label
        style={ParentStyles.Label()}
        text={(magicResistance * 100).toFixed(1) + "%"}
      />
    </Panel>
  );

};

export default withReactTimeout(MagicResistance);
