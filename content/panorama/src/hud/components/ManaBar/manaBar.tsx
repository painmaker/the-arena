import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { Styles } from "./Styles";

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
    <Panel hittest={false} style={Styles.Container()}>
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className={'manaProgressBar'}
        style={Styles.Progressbar()}
      >
        <DOTAScenePanel
          style={Styles.Scene(mana, maxMana)}
          map={'scenes/hud/healthbarburner'}
          camera={'camera_1'}
        />
      </ProgressBar>
      <Label style={Styles.ManaLabel()} text={mana + " / " + maxMana} />
      <Label style={Styles.RegenLabel()} text={'+ ' + manaRegen.toFixed(1)} />
    </Panel>
  );

};

export default withReactTimeout(ManaBar);
