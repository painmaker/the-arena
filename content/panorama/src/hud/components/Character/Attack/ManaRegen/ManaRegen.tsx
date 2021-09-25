import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../../../hooks/useSelectedUnit";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {
  // ownProps
};

const AttackSpeed = (props: Props) => {

  $.Msg("REACT-RENDER: Character - ManaRegen rendered");

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [manaRegen, setManaRegen] = useState(Entities.GetManaThinkRegen(selectedUnit))

  useEffect(() => {
    const id = setInterval(() => {
      setManaRegen(Entities.GetManaThinkRegen(selectedUnit));
    }, REFRESH_RATE);
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel className={'attackPanelEntryContainer'}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Mana Regen:'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={manaRegen.toFixed(2)}
          className={'characterPanelLabel characterPanelStatsLabel'} />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(AttackSpeed);
