import React, { useEffect, useState } from "react";
import { Styles as ParentStyles } from "../Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import { HUD_THINK_MEDIUM } from "../../../../App";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const MagicalResistance = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - MagicalResistance rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [resistance, setResistance] = useState(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL))

  useEffect(() => {
    const update = () => setResistance(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL));
    const id = setInterval!(update, HUD_THINK_MEDIUM);
    return () => clearInterval!(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label
          text={'Magical Resistance:'}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={(resistance * 100).toFixed(2) + " %"}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(ReactTimeout(MagicalResistance));
