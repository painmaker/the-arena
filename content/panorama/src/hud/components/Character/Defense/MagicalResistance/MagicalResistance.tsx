import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {};

const MagicalResistance = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - MagicalResistance rendered");

  const [resistance, setResistance] = useState(Entities.GetArmorReductionForDamageType(Players.GetLocalPlayerPortraitUnit(), DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL))

  useEffect(() => {
    const id = props.setInterval(() => {
      setResistance(Entities.GetArmorReductionForDamageType(Players.GetLocalPlayerPortraitUnit(), DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL));
    }, REFRESH_RATE)
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel className={'defensePanelEntryContainer'}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Magical Resistance:'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={(resistance * 100).toFixed(2) + " %"}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(MagicalResistance);
