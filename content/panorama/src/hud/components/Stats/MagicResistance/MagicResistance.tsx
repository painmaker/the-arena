import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";
import { useSelectedUnit } from "../../../hooks/useSelectedUnit";
import { HUD_THINK_MEDIUM } from "../../../App";

type Props = ReactTimeoutProps & {
  // ownProps
};

const MagicResistance = (props: Props) => {

  $.Msg("REACT-RENDER: Stats - MagicalResistance rendered");

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [magicResistance, setMagicResistance] = useState(Entities.GetMagicalArmorValue(selectedUnit));

  useEffect(() => {

    const update = () => {
      setMagicResistance(Entities.GetMagicalArmorValue(selectedUnit));
    };

    // update();
    const id = setInterval(update, HUD_THINK_MEDIUM);

    return () => clearInterval(id);

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

export default withReactTimeout(MagicResistance);
