import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {};

const StatusResistance = (props: Props) => {

  const [resistance, setResistance] = useState(0)

  useEffect(() => {
    const id = props.setInterval(() => {
      const entindex = Players.GetLocalPlayerPortraitUnit();
      const numberOfBuffs = Entities.GetNumBuffs(entindex);
      for (let i = 0; i < numberOfBuffs; i++) {
        const buff = Entities.GetBuff(entindex, i);
        const name = Buffs.GetName(entindex, buff);
        if (name === 'modifier_ui_status_resistance') {
          setResistance(Buffs.GetStackCount(entindex, buff));
        }
      }
    }, REFRESH_RATE)
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel className={'defensePanelEntryContainer'}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Status Resistance:'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={(resistance !== 0 ? (resistance / 100).toFixed(2) : 0) + ' %'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(StatusResistance);
