import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../../../hooks/useSelectedUnit";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {
  // ownProps
};

const Armor = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - Armor rendered");

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [armor, setArmor] = useState(Entities.GetPhysicalArmorValue(selectedUnit))
  const [bonusArmor, setBonusArmor] = useState(Entities.GetBonusPhysicalArmor(selectedUnit))

  useEffect(() => {
    const id = setInterval(() => {
      setArmor(Entities.GetPhysicalArmorValue(selectedUnit));
      setBonusArmor(Entities.GetBonusPhysicalArmor(selectedUnit));
    }, REFRESH_RATE)
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel className={'defensePanelEntryContainer'}>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={'Armor:'}
          className={'characterPanelLabel characterPanelStatsLabel'}
        />
      </Panel>
      <Panel className={'characterPanelStatsEntry'}>
        <Label
          text={(armor - bonusArmor).toFixed(1)}
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
