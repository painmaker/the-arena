import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../CharacterPanel";

type Props = ReactTimeoutProps & {};

const AttackSpeed = (props: Props) => {

  const [attackSpeed, setAttackSpeed] = useState(Entities.GetAttackSpeed(Players.GetLocalPlayerPortraitUnit()))
  const [secondsPerAttack, setSecondsPerAttack] = useState(Entities.GetSecondsPerAttack(Players.GetLocalPlayerPortraitUnit()))

  useEffect(() => {
    const id = props.setInterval(() => {
      setAttackSpeed(Entities.GetAttackSpeed(Players.GetLocalPlayerPortraitUnit()));
      setSecondsPerAttack(Entities.GetSecondsPerAttack(Players.GetLocalPlayerPortraitUnit()));
    }, REFRESH_RATE)
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel hittest={false} style={{ width: "100%", flowChildren: 'right' }}>
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
