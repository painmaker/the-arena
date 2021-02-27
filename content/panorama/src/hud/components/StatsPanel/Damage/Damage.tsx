import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {}

const Damage = (props: Props) => {

  const [minDamage, setMinDamage] = useState(Entities.GetDamageMin(Players.GetLocalPlayerPortraitUnit()));
  const [maxDamage, setMaxDamage] = useState(Entities.GetDamageMax(Players.GetLocalPlayerPortraitUnit()));
  const [bonusDamage, setBonusDamage] = useState(Entities.GetDamageBonus(Players.GetLocalPlayerPortraitUnit()));

  useEffect(() => {
    const id = props.setInterval(() => {
      setMinDamage(Entities.GetDamageMin(Players.GetLocalPlayerPortraitUnit()));
      setMaxDamage(Entities.GetDamageMax(Players.GetLocalPlayerPortraitUnit()));
      setBonusDamage(Entities.GetDamageBonus(Players.GetLocalPlayerPortraitUnit()));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel className={'statsPanelEntryOuterContainer'}>
      <Panel className={'statsPanelEntryInnerContainer'}>
        <Panel className={'statsPanelAttackImage'} />
        <Label className={'statsPanelLabel'} text={minDamage.toFixed(0) + "-" + maxDamage.toFixed(0)} />
        {bonusDamage !== 0 && (
          <Label
            style={{ color: bonusDamage > 0 ? 'rgba(0, 128, 0, 0.75)' : 'rgba(175, 0, 0, 0.75)' }}
            text={(bonusDamage > 0 ? '+' : '') + "(" + bonusDamage.toFixed(0) + ")"}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(Damage);
