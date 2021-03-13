import React from "react";
import { FocusedHero } from "../../../../types/heroSelectionTypes";

type Props = {
  focusedHero: FocusedHero,
}

const Abilities = (props: Props) => {
  return (
    <Panel className={'heroSelectionDescriptionAbilitiesOuterContainer'}>
      <Label className={'heroSelectionDescriptionAbilitiesTitleLabel'} text={"ABILITIES"} />
      <Panel className={'heroSelectionDescriptionAbilitiesInnerContainer'}>
        {Object.values(props.focusedHero.abilities).map((ability) => (
          <DOTAAbilityImage
            id={ability}
            key={ability}
            className={'heroSelectionDescriptionAbilityImage'}
            abilityname={ability}
            onmouseover={() => $.DispatchEvent("DOTAShowAbilityTooltip", $("#" + ability), ability)}
            onmouseout={() => $.DispatchEvent("DOTAHideAbilityTooltip", $("#" + ability))}
          />
        ))}
      </Panel>
    </Panel>
  );
};

export default Abilities;
