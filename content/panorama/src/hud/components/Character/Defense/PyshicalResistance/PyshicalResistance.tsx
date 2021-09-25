import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../../../hooks/useSelectedUnit";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {
  // ownProps
};

const PyshicalResistance = (props: Props) => {

  $.Msg("REACT-RENDER: Character - PhysicalResistance rendered");

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [resistance, setResistance] = useState(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL))

  useEffect(() => {
    const id = setInterval(() => {
      setResistance(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL));
    }, REFRESH_RATE)
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel className={'defensePanelEntryContainer'}>
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
