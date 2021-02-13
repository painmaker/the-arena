import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../CharacterPanel";

type Props = ReactTimeoutProps & {};

const HealthRegen = (props: Props) => {

  const [regen, setRegen] = useState(0)
  const [baseRegen, setBaseRegen] = useState(0)

  useEffect(() => {
    const id = props.setInterval(() => {
      // Hack because panorama API method for health regen is bugged
      const entindex = Players.GetLocalPlayerPortraitUnit();
      const numberOfBuffs = Entities.GetNumBuffs(entindex);
      for (let i = 0; i < numberOfBuffs; i++) {
        const buff = Entities.GetBuff(entindex, i);
        const name = Buffs.GetName(entindex, buff);
        if (name === 'modifier_ui_health_regen') {
          setRegen(Buffs.GetStackCount(entindex, buff) / 100);
        }
        if (name === 'modifier_ui_base_health_regen') {
          setBaseRegen(Buffs.GetStackCount(entindex, buff) / 100);
        }
      }
    }, REFRESH_RATE)
    return () => props.clearInterval(id);
  }, []);

  const increasedRegen = regen - baseRegen;

  return (
    <Panel hittest={false} style={{ width: "100%", flowChildren: 'right' }}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Health Regen:'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={baseRegen.toFixed(2)}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
        {increasedRegen !== 0 && (
          <Label
            text={(increasedRegen > 0 ? '+' : '') + increasedRegen.toFixed(2)}
            className={'characterPanelLabel characterPanelStatsLabel'}
            style={{ color: increasedRegen > 0 ? 'green' : 'red' }}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(HealthRegen);
