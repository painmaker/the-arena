import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";
import { Styles as ParentStyles } from "../Styles";
import { useSelectedUnit } from "../../../hooks/useSelectedUnit";

type Props = ReactTimeoutProps & {
  // ownProps
}

const Armor = (props: Props) => {

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [armor, setArmor] = useState(Entities.GetPhysicalArmorValue(selectedUnit));
  const [bonusArmor, setBonusArmor] = useState(Entities.GetBonusPhysicalArmor(selectedUnit));

  useEffect(() => {
    const id = setInterval(() => {
      setArmor(Entities.GetPhysicalArmorValue(selectedUnit));
      setBonusArmor(Entities.GetBonusPhysicalArmor(selectedUnit));
    }, 100);
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

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
