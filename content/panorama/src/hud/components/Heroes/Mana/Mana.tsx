import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  entIndex: EntityIndex,
}

const Mana = (props: Props) => {

  const [mana, setMana] = useState(Entities.GetMana(props.entIndex));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(props.entIndex));

  useEffect(() => {
    const id = props.setInterval(() => {
      setMana(Entities.GetMana(props.entIndex));
      setMaxMana(Entities.GetMaxMana(props.entIndex));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

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
