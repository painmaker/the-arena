import React, { useState } from "react";
import { FocusedHero } from "../../../../types/heroSelectionTypes";
import Ability from "./Ability/Ability";

type Props = {
  focusedHero: FocusedHero,
}

const Abilities = (props: Props) => {
  return (
    <Panel className={'heroSelectionDescriptionAbilitiesOuterContainer'}>
      <Label className={'heroSelectionDescriptionAbilitiesTitleLabel'} text={"ABILITIES"} />
      <Panel className={'heroSelectionDescriptionAbilitiesInnerContainer'}>
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
