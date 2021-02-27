import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {}

const Armor = (props: Props) => {

  const [armor, setArmor] = useState(Entities.GetPhysicalArmorValue(Players.GetLocalPlayerPortraitUnit()));
  const [bonusArmor, setBonusArmor] = useState(Entities.GetBonusPhysicalArmor(Players.GetLocalPlayerPortraitUnit()));

  useEffect(() => {
    const id = props.setInterval(() => {
      setArmor(Entities.GetPhysicalArmorValue(Players.GetLocalPlayerPortraitUnit()));
      setBonusArmor(Entities.GetBonusPhysicalArmor(Players.GetLocalPlayerPortraitUnit()));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel className={'statsPanelEntryOuterContainer'}>
      <Panel className={'statsPanelEntryInnerContainer'}>
        <Panel className={'statsPanelArmorImage'} />
        <Label className={'statsPanelLabel'} text={(armor - bonusArmor).toFixed(1)} />
        {bonusArmor !== 0 && (
          <Label
            style={{ color: bonusArmor > 0 ? 'rgba(0, 128, 0, 0.75)' : 'rgba(175, 0, 0, 0.75)' }}
            text={(bonusArmor > 0 ? "+" : "") + "(" + bonusArmor.toFixed(1) + ")"}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(Armor);
