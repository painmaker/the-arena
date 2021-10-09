import React, { useEffect, useState } from "react";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";
import { HUD_THINK_MEDIUM } from "../../../App";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const MagicResistance = (props: Props) => {

  // $.Msg("REACT-RENDER: Stats - MagicalResistance rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [magicResistance, setMagicResistance] = useState(Entities.GetMagicalArmorValue(selectedUnit));

  useEffect(() => {
    const update = () => setMagicResistance(Entities.GetMagicalArmorValue(selectedUnit));
    const id = setInterval!(update, HUD_THINK_MEDIUM);
    return () => clearInterval!(id);
  }, [selectedUnit, setInterval, clearInterval]);

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

export default React.memo(ReactTimeout(MagicResistance));
