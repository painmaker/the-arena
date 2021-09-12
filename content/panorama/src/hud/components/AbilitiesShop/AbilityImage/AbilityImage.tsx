import React from "react";
import { Styles } from "./Styles";

type Props = {
  entindex: EntityIndex,
  abilityname: string,
}

const onMouseOver = (entindex: EntityIndex, abilityname: string) => {
  $.DispatchEvent(
    "DOTAShowAbilityTooltipForEntityIndex",
    $("#ability_shop_image_" + abilityname),
    abilityname,
    entindex
  )
}

const onMouseOut = (abilityname: string) => {
  $.DispatchEvent("DOTAHideAbilityTooltip", $("#ability_shop_image_" + abilityname))
}

const AbilityImage = (props: Props) => {
  return (
    <DOTAAbilityImage
      id={'ability_shop_image_' + props.abilityname}
      style={Styles.AbilityImage()}
      abilityname={props.abilityname}
      onmouseout={() => onMouseOut(props.abilityname)}
      onmouseover={() => onMouseOver(props.entindex, props.abilityname)}
    />
  );
};

export default AbilityImage;
