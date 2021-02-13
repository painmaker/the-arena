import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../CharacterPanel";

type Props = ReactTimeoutProps & {};

const Damage = (props: Props) => {

  const [minDamage, setMinDamage] = useState(Entities.GetDamageMin(Players.GetLocalPlayerPortraitUnit()))
  const [maxDamage, setMaxDamage] = useState(Entities.GetDamageMax(Players.GetLocalPlayerPortraitUnit()))
  const [bonusDamage, setBonusDamage] = useState(Entities.GetDamageBonus(Players.GetLocalPlayerPortraitUnit()))

  useEffect(() => {
    const id = props.setInterval(() => {
      setMinDamage(Entities.GetDamageMin(Players.GetLocalPlayerPortraitUnit()));
      setMaxDamage(Entities.GetDamageMax(Players.GetLocalPlayerPortraitUnit()));
      setBonusDamage(Entities.GetDamageBonus(Players.GetLocalPlayerPortraitUnit()));
    }, REFRESH_RATE);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel hittest={false} style={{ width: "100%", flowChildren: 'right' }}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Damage:'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
      <Panel className={'characterPanelStatsEntry'} style={{ flowChildren: 'right' }}>
        <Label
          text={minDamage.toFixed(0) + " - " + maxDamage.toFixed(0)}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
        {bonusDamage !== 0 && (
          <Label
            text={'+' + bonusDamage}
            className={'characterPanelLabel characterPanelStatsLabel'}
            style={{ color: bonusDamage > 0 ? 'green' : 'red' }}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(Damage);
