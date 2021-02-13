import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../CharacterPanel";

type Props = ReactTimeoutProps & {};

const Armor = (props: Props) => {

  const [armor, setArmor] = useState(Entities.GetPhysicalArmorValue(Players.GetLocalPlayerPortraitUnit()))
  const [bonusArmor, setBonusArmor] = useState(Entities.GetBonusPhysicalArmor(Players.GetLocalPlayerPortraitUnit()))

  useEffect(() => {
    const id = props.setInterval(() => {
      setArmor(Entities.GetPhysicalArmorValue(Players.GetLocalPlayerPortraitUnit()));
      setBonusArmor(Entities.GetBonusPhysicalArmor(Players.GetLocalPlayerPortraitUnit()));
    }, REFRESH_RATE)
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel hittest={false} style={{ width: "100%", flowChildren: 'right' }}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Armor:'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={(armor - bonusArmor).toFixed(0)}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
        {bonusArmor !== 0 && (
          <Label
            text={(bonusArmor > 0 ? '+' : '') + bonusArmor.toFixed(0)}
            className={'characterPanelLabel characterPanelStatsLabel'}
            style={{ color: bonusArmor > 0 ? 'green' : 'red' }}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(Armor);
