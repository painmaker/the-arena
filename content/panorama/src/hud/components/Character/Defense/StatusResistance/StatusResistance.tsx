import React, { useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import { Styles as ParentStyles } from "../Styles";

type Props = {
  selectedUnit: EntityIndex,
};

const StatusResistance = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - StatusResistance rendered");

  const { selectedUnit } = props;
  const [resistance, setResistance] = useState(0)

  useInterval(() => {
    const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
    for (let i = 0; i < numberOfBuffs; i++) {
      const buff = Entities.GetBuff(selectedUnit, i);
      const name = Buffs.GetName(selectedUnit, buff);
      if (name === 'modifier_ui_status_resistance') {
        setResistance(Buffs.GetStackCount(selectedUnit, buff));
      }
    }
  }, HUD_THINK_MEDIUM);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label
          text={'Pyshical Resistance:'}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={(resistance !== 0 ? (resistance / 100).toFixed(2) : 0) + ' %'}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(StatusResistance);
