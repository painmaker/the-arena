import React from "react";
import { FocusedHero } from "../../../../types/heroSelectionTypes";

type Props = {
  focusedHero: FocusedHero,
}

const HealthAndMana = (props: Props) => {

  return (
    <Panel className={'heroSelectionDescriptionHealthAndManaOuterContainer'}>
      <Label className={'heroSelectionDescriptionHealthAndManaTitleLabel'} text={"HEALTH & MANA"} />
      <Panel className={'heroSelectionDescriptionHealthAndManaInnerContainer'}>
        <Panel className={'heroSelectionDescriptionHealthContainer'}>
          <Label
            className={'heroSelectionDescriptionHealthAndManaLabel'}
            text={props.focusedHero.health + ' / ' + props.focusedHero.health}
          />
          <Label
            className={'heroSelectionDescriptionRegenLabel'}
            text={'+ ' + props.focusedHero.healthRegen.toFixed(2)}
          />
        </Panel>
        <Panel className={'heroSelectionDescriptionManaContainer'}>
          <Label
            className={'heroSelectionDescriptionHealthAndManaLabel'}
            text={props.focusedHero.mana + ' / ' + props.focusedHero.mana}
          />
          <Label
            className={'heroSelectionDescriptionRegenLabel'}
            text={'+ ' + props.focusedHero.manaRegen.toFixed(2)}
          />
        </Panel>
      </Panel>
    </Panel>
  );

};

export default HealthAndMana;
