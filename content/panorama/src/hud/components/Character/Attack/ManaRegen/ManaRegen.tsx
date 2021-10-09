import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../../App";
import { Styles as ParentStyles } from "../Styles";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
};

const ManaRegen = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - ManaRegen rendered");

  const { selectedUnit, setInterval, clearInterval } = props;

  const [manaRegen, setManaRegen] = useState(Entities.GetManaThinkRegen(selectedUnit))

  useEffect(() => {
    const update = () => setManaRegen(Entities.GetManaThinkRegen(selectedUnit));
    const id = setInterval!(update, HUD_THINK_MEDIUM);
    return () => clearInterval!(id);
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

export default React.memo(ReactTimeout(ManaRegen));
