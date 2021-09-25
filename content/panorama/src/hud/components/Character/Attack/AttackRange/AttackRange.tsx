import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../../../hooks/useSelectedUnit";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {
  // ownProps
};

const AttackSpeed = (props: Props) => {

  $.Msg("REACT-RENDER: Character - AttackRange rendered");

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [attackRange, setAttackRange] = useState(Entities.GetAttackRange(selectedUnit))

  useEffect(() => {
    const id = setInterval(() => {
      setAttackRange(Entities.GetAttackRange(selectedUnit));
    }, REFRESH_RATE)
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel className={'attackPanelEntryContainer'}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Attack Range:'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={attackRange.toFixed(0)}
          className={'characterPanelLabel characterPanelStatsLabel'} />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(AttackSpeed);
