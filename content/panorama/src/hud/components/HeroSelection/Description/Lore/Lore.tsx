import React from "react";
import { FocusedHero } from "../../../../types/heroSelectionTypes";

type Props = {
  focusedHero: FocusedHero,
}

const Lore = (props: Props) => {

  return (
    <Panel className={'heroSelectionDescriptionLoreOuterContainer'}>
      <Label className={'heroSelectionDescriptionLoreTitleLabel'} text={"LORE"} />
      <Panel className={'heroSelectionDescriptionLoreInnerContainer'}>
        <Label className={'heroSelectionDescriptionLoreLabel'} text={$.Localize(props.focusedHero.lore)} />
      </Panel>
    </Panel>
  );

};

export default Lore;
