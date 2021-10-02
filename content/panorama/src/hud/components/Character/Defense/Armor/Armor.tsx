import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles as ParentStyles } from "../Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const Armor = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - Armor rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [armor, setArmor] = useState(Entities.GetPhysicalArmorValue(selectedUnit))
  const [bonusArmor, setBonusArmor] = useState(Entities.GetBonusPhysicalArmor(selectedUnit))

  useEffect(() => {
    const id = setInterval(() => {
      setArmor(Entities.GetPhysicalArmorValue(selectedUnit));
      setBonusArmor(Entities.GetBonusPhysicalArmor(selectedUnit));
    }, HUD_THINK_MEDIUM)
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Armor:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={(armor - bonusArmor).toFixed(1)}
          style={ParentStyles.ColumnLabel()}
        />
        {bonusArmor !== 0 && (
          <Label
            text={(bonusArmor > 0 ? ' + ' : ' - ') + Math.abs(bonusArmor).toFixed(0)}
            style={{
              ...ParentStyles.ColumnLabel(),
              color: bonusArmor > 0 ? 'green' : 'red',
            }}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(Armor);

