import React, { useEffect, useState } from "react";
import { HUD_THINK } from "../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  hero: EntityIndex,
}

const Mana = (props: Props) => {

  $.Msg("REACT-RENDER: Heroes - Mana rendered");

  const { hero, setInterval, clearInterval } = props;

  const [mana, setMana] = useState(Entities.GetMana(hero));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(hero));

  useEffect(() => {

    const update = () => {
      setMana(Entities.GetMana(hero));
      setMaxMana(Entities.GetMaxMana(hero));
    };

    // update();
    const id = setInterval(update, HUD_THINK);

    return () => clearInterval(id);

  }, [hero, setInterval, clearInterval]);

  return (
    <Panel style={Styles.Container()}>
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className='manaProgressBar'
        style={Styles.Progressbar()}
      >
        <DOTAScenePanel
          style={Styles.Scene(mana, maxMana)}
          map={'scenes/hud/healthbarburner'}
          camera={'camera_1'}
        />
      </ProgressBar>
    </Panel>
  );

};

export default withReactTimeout(Mana);
