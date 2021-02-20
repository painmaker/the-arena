import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {};

const AttackSpeed = (props: Props) => {

  const [manaRegen, setManaRegen] = useState(Entities.GetManaThinkRegen(Players.GetLocalPlayerPortraitUnit()))

  useEffect(() => {
    const id = props.setInterval(() => {
      setManaRegen(Entities.GetManaThinkRegen(Players.GetLocalPlayerPortraitUnit()));
    }, REFRESH_RATE);
    return () => props.clearInterval(id);
  }, []);

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
