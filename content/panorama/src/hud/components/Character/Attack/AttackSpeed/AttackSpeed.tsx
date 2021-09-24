import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../../../hooks/useSelectedUnit";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {
  // ownProps
};

const AttackSpeed = (props: Props) => {

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [attackSpeed, setAttackSpeed] = useState(Entities.GetAttackSpeed(selectedUnit))
  const [secondsPerAttack, setSecondsPerAttack] = useState(Entities.GetSecondsPerAttack(selectedUnit))

  useEffect(() => {
    const id = setInterval(() => {
      setAttackSpeed(Entities.GetAttackSpeed(selectedUnit));
      setSecondsPerAttack(Entities.GetSecondsPerAttack(selectedUnit));
    }, REFRESH_RATE)
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel className={'attackPanelEntryContainer'}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Attack Speed:'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={(attackSpeed * 100).toFixed(0) + " (" + (secondsPerAttack).toFixed(2) + 's)'}
          className={'characterPanelLabel characterPanelStatsLabel'} />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(AttackSpeed);
