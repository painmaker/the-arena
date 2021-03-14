import React from "react";

type Props = {
  ability: string,
}

const Ability = (props: Props) => {
  return (
    <DOTAAbilityImage
      id={props.ability}
      className={'heroSelectionDescriptionAbilityImage'}
      abilityname={props.ability}
      onmouseover={() => $.DispatchEvent("DOTAShowAbilityTooltip", $("#" + props.ability), props.ability)}
      onmouseout={() => $.DispatchEvent("DOTAHideAbilityTooltip", $("#" + props.ability))}
    />
  );
};

export default Ability;
