import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";

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
    <Panel style={ParentStyles.Entry()}>
      <Panel style={Styles.Image()} />
      <Label
        style={ParentStyles.Label()}
        text={(armor - bonusArmor).toFixed(1)}
      />
      {bonusArmor !== 0 && (
        <Label
          style={{ color: bonusArmor > 0 ? 'rgba(0, 128, 0, 0.75)' : 'rgba(175, 0, 0, 0.75)' }}
          text={(bonusArmor > 0 ? "+" : "") + "(" + bonusArmor.toFixed(1) + ")"}
        />
      )}
    </Panel>
  );

};

export default withReactTimeout(Armor);
