import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {};

const Evasion = (props: Props) => {

  $.Msg("REACT-RENDER: Character - Evasion rendered");

  const [evasion, setEvasion] = useState(0);

  useEffect(() => {
    const id = props.setInterval(() => {
      const entindex = Players.GetLocalPlayerPortraitUnit();
      const numberOfBuffs = Entities.GetNumBuffs(entindex);
      for (let i = 0; i < numberOfBuffs; i++) {
        const buff = Entities.GetBuff(entindex, i);
        const name = Buffs.GetName(entindex, buff);
        if (name === 'modifier_ui_evasion') {
          setEvasion(Buffs.GetStackCount(entindex, buff));
        }
      }
    }, REFRESH_RATE)
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel className={'defensePanelEntryContainer'}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Evasion:'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={(evasion > 0 ? (evasion / 100).toFixed(0) : 0) + ' %'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(Evasion);
