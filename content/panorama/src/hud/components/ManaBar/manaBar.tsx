import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { useSelectedUnit } from "../../hooks/useSelectedUnit";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {}

const ManaBar = (props: Props) => {

  const { setInterval, clearInterval } = props;

  const selectedUnit = useSelectedUnit();
  const [mana, setMana] = useState(Entities.GetMana(selectedUnit));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(selectedUnit));
  const [manaRegen, setManaRegen] = useState(Entities.GetManaThinkRegen(selectedUnit));

  useEffect(() => {

    const update = () => {
      setMana(Entities.GetMana(selectedUnit));
      setMaxMana(Entities.GetMaxMana(selectedUnit));
      setManaRegen(Entities.GetManaThinkRegen(selectedUnit));
    };

    update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [selectedUnit, setInterval, clearInterval]);

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
