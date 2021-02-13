import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { REFRESH_RATE } from "../../CharacterPanel";

type Props = ReactTimeoutProps & {};

const PyshicalResistance = (props: Props) => {

  const [resistance, setResistance] = useState(Entities.GetArmorReductionForDamageType(Players.GetLocalPlayerPortraitUnit(), DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL))

  useEffect(() => {
    const id = props.setInterval(() => {
      setResistance(Entities.GetArmorReductionForDamageType(Players.GetLocalPlayerPortraitUnit(), DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL));
    }, REFRESH_RATE)
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel hittest={false} style={{ width: "100%", flowChildren: 'right' }}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Pyshical Resistance:'}
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

export default withReactTimeout(PyshicalResistance);
