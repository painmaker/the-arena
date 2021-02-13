import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../CharacterPanel";

type Props = ReactTimeoutProps & {};

const AttackSpeed = (props: Props) => {

  const [attackRange, setAttackRange] = useState(Entities.GetAttackRange(Players.GetLocalPlayerPortraitUnit()))

  useEffect(() => {
    const id = props.setInterval(() => {
      setAttackRange(Entities.GetAttackRange(Players.GetLocalPlayerPortraitUnit()));
    }, REFRESH_RATE)
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel hittest={false} style={{ width: "100%", flowChildren: 'right' }}>
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
