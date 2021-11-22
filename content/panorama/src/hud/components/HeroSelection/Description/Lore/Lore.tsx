import React from "react";
import { FocusedHero } from "../../../../types/heroSelectionTypes";
import Styles from './lore.module.css';

type Props = {
  focusedHero: FocusedHero,
}

const Lore = (props: Props) => {

  return (
    <Panel className={Styles.outerContainer}>
      <Label className={Styles.titleLabel} text={"LORE"} />
      <Panel className={Styles.innerContainer}>
        <Label className={Styles.loreLabel} text={$.Localize(props.focusedHero.lore)} />
      </Panel>
    </Panel>
  );

};

export default Lore;
