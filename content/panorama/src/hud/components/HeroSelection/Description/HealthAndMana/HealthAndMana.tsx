import React from "react";
import { FocusedHero } from "../../../../types/heroSelectionTypes";
import Styles from './HealthAndMana.module.css';

type Props = {
  focusedHero: FocusedHero,
}

const HealthAndMana = (props: Props) => {

  return (
    <Panel className={Styles.outerContainer}>
      <Label className={Styles.titleLabel} text={"HEALTH & MANA"} />
      <Panel className={Styles.innerContainer}>
        <Panel className={Styles.healthContainer}>
          <Label
            className={Styles.healthAndManaLabel}
            text={props.focusedHero.health + ' / ' + props.focusedHero.health}
          />
          <Label
            className={Styles.regenLabel}
            text={'+ ' + props.focusedHero.healthRegen}
          />
        </Panel>
        <Panel className={Styles.manaContainer}>
          <Label
            className={Styles.healthAndManaLabel}
            text={props.focusedHero.mana + ' / ' + props.focusedHero.mana}
          />
          <Label
            className={Styles.regenLabel}
            text={'+ ' + props.focusedHero.manaRegen}
          />
        </Panel>
      </Panel>
    </Panel>
  );

};

export default HealthAndMana;
