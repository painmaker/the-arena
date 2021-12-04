import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from './styles.module.css';

type Props = {
  ability: AbilityEntityIndex,
}

const ManaCost = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilityBarItem - ManaCost rendered");

  const { ability } = props;

  const [manaCost, setManaCost] = useState(0);

  useInterval(() => {
    setManaCost(Abilities.GetManaCost(ability));
  }, HUD_THINK_FAST);

  if (manaCost === 0) {
    return null;
  }

  return (
    <Panel className={Styles.container}>
      <Label
        className={Styles.label}
        text={manaCost}
      />
    </Panel>
  );

};

export default React.memo(ManaCost);
