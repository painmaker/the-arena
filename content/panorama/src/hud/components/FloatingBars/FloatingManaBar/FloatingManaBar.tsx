import React, { useEffect, useState } from "react";
import { HUD_THINK_FAST } from "../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  unit: EntityIndex,
};

const FloatingManaBar = (props: Props) => {

  const { unit, setInterval, clearInterval } = props;

  const [mana, setMana] = useState(Entities.GetMana(unit));
  const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(unit));

  useEffect(() => {

    const update = () => {
      setMana(Entities.GetMana(unit));
      setMaxMana(Entities.GetMaxMana(unit));
    };

    // update();
    const id = setInterval(update, HUD_THINK_FAST);

    return () => clearInterval(id);

  }, [unit, setInterval, clearInterval]);

  return (
    <Panel hittest={false} style={Styles.Container(maxMana > 0)}>
      <ProgressBar
        min={0}
        max={maxMana}
        value={mana}
        className={'manaProgressBar'}
        style={Styles.Progressbar()}
      />
    </Panel>
  );

}

export default withReactTimeout(FloatingManaBar);