import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles as ParentStyles } from "../Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const Evasion = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - Evasion rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [evasion, setEvasion] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
      for (let i = 0; i < numberOfBuffs; i++) {
        const buff = Entities.GetBuff(selectedUnit, i);
        const name = Buffs.GetName(selectedUnit, buff);
        if (name === 'modifier_ui_evasion') {
          setEvasion(Buffs.GetStackCount(selectedUnit, buff));
        }
      }
    }, HUD_THINK_MEDIUM)
    return () => clearInterval(id);
  }, [selectedUnit]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Evasion:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={(evasion > 0 ? (evasion / 100).toFixed(0) : 0) + ' %'}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(Evasion);
