import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../../../hooks/useSelectedUnit";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {};

const StatusResistance = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - StatusResistance rendered");

  const selectedUnit = useSelectedUnit();
  const [resistance, setResistance] = useState(0)

  useEffect(() => {
    const id = props.setInterval(() => {
      const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
      for (let i = 0; i < numberOfBuffs; i++) {
        const buff = Entities.GetBuff(selectedUnit, i);
        const name = Buffs.GetName(selectedUnit, buff);
        if (name === 'modifier_ui_status_resistance') {
          setResistance(Buffs.GetStackCount(selectedUnit, buff));
        }
      }
    }, REFRESH_RATE)
    return () => props.clearInterval(id);
  }, [selectedUnit]);

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
