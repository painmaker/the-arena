import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

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
    <Panel className={"statsPanelEntryOuterContainer"}>
      <Panel className={'statsPanelEntryInnerContainer'}>
        <Panel className={"statsPanelMagicResistImage"} />
        <Label className={"statsPanelLabel"} text={(magicResistance * 100).toFixed(1) + "%"} />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(MagicResistance);
