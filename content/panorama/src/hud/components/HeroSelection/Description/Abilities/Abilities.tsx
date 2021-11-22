import React from "react";
import { FocusedHero } from "../../../../types/heroSelectionTypes";
import Ability from "./Ability/Ability";
import Styles from './abilities.module.css'

type Props = {
  focusedHero: FocusedHero,
}

const Abilities = (props: Props) => {
  return (
    <Panel className={Styles.container}>
      <Label className={Styles.label} text={"ABILITIES"} />
      <Panel className={Styles.abilitiesContainer}>
        {Object.values(props.focusedHero.abilities).map((ability) => (
          <Ability
            key={ability}
            ability={ability}
          />
        ))}
      </Panel>
    </Panel>
  );
};

export default Abilities;
