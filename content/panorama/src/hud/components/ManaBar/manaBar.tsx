import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {}

const ManaBar = (props: Props) => {

  const [mana, setMana] = useState(Entities.GetMana(Players.GetLocalPlayerPortraitUnit()));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(Players.GetLocalPlayerPortraitUnit()));
  const [manaRegen, setManaRegen] = useState(Entities.GetManaThinkRegen(Players.GetLocalPlayerPortraitUnit()));

  useEffect(() => {
    const id = props.setInterval(() => {
      setMana(Entities.GetMana(Players.GetLocalPlayerPortraitUnit()));
      setMaxMana(Entities.GetMaxMana(Players.GetLocalPlayerPortraitUnit()));
      setManaRegen(Entities.GetManaThinkRegen(Players.GetLocalPlayerPortraitUnit()));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  if (maxMana <= 0) {
    return null;
  }

  return (
    <Panel hittest={false} className={"manaBarContainer"}>
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className='manaBarProgressBar'
      />
      <Label className={'manaBarManaLabel'} text={mana + "/" + maxMana} />
      <Label className={'manaBarRegenLabel'} text={'+' + manaRegen.toFixed(1)} />
    </Panel>
  );

};

export default withReactTimeout(ManaBar);
