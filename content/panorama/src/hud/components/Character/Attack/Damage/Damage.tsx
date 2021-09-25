import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../../../hooks/useSelectedUnit";
import { REFRESH_RATE } from "../../Character";

type Props = ReactTimeoutProps & {
  // ownProps
};

const Damage = (props: Props) => {

  $.Msg("REACT-RENDER: Character - Damage rendered");

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [minDamage, setMinDamage] = useState(Entities.GetDamageMin(selectedUnit))
  const [maxDamage, setMaxDamage] = useState(Entities.GetDamageMax(selectedUnit))
  const [bonusDamage, setBonusDamage] = useState(Entities.GetDamageBonus(selectedUnit))

  useEffect(() => {
    const id = setInterval(() => {
      setMinDamage(Entities.GetDamageMin(selectedUnit));
      setMaxDamage(Entities.GetDamageMax(selectedUnit));
      setBonusDamage(Entities.GetDamageBonus(selectedUnit));
    }, REFRESH_RATE);
    return () => clearInterval(id);
  }, [selectedUnit, setInterval, clearInterval]);

  return (
    <Panel className={'attackPanelEntryContainer'}>
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
