import React from "react";
import Styles from './styles.module.css';

type Props = {
  ability: string,
}

const Ability = (props: Props) => {
  return (
    <DOTAAbilityImage
      id={props.ability}
      className={Styles.image}
      abilityname={props.ability}
      onmouseover={() => $.DispatchEvent("DOTAShowAbilityTooltip", $("#" + props.ability), props.ability)}
      onmouseout={() => $.DispatchEvent("DOTAHideAbilityTooltip", $("#" + props.ability))}
    />
  );
};

export default Ability;
