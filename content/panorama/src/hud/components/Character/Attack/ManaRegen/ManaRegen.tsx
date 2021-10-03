import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { Styles as ParentStyles } from "../Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const AttackSpeed = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - ManaRegen rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [manaRegen, setManaRegen] = useState(Entities.GetManaThinkRegen(selectedUnit))

  useEffect(() => {
    const id = setInterval(() => {
      setManaRegen(Entities.GetManaThinkRegen(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel style={ParentStyles.Row()}>
      <Panel style={ParentStyles.LeftColumn()}>
        <Label text={'Mana Regeneration:'} style={ParentStyles.ColumnLabel()} />
      </Panel>
      <Panel style={ParentStyles.RightColumn()}>
        <Label
          text={manaRegen.toFixed(2)}
          style={ParentStyles.ColumnLabel()}
        />
      </Panel>
    </Panel>
  );

};

export default React.memo(withReactTimeout(AttackSpeed));
