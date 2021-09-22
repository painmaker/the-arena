import React from "react";
import { Styles } from "./Styles";

type Props = {
  entindex: EntityIndex,
  abilityname: string,
  searchValue: string,
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
  $.DispatchEvent("DOTAHideAbilityTooltip", $("#ability_shop_image_" + abilityname));
}

const onRightClick = (entindex: EntityIndex, abilityname: string) => {
  $.Msg("onRightClick: " + abilityname)
  GameEvents.SendCustomGameEventToServer("purchase_ability", { entindex, abilityname });
}

const AbilityImage = (props: Props) => {

  const searchMatchesAbilityname = props.abilityname.match(props.searchValue) ? false : true;
  const isWashedOut = props.searchValue.trim().length === 0 ? false : searchMatchesAbilityname;

  return (
    <React.Fragment>
      <Button
        style={Styles.AbilityImage(isWashedOut)}
        oncontextmenu={() => onRightClick(props.entindex, props.abilityname)}
        onmouseout={() => onMouseOut(props.abilityname)}
        onmouseover={() => onMouseOver(props.entindex, props.abilityname)}
      >
        <DOTAAbilityImage
          id={'ability_shop_image_' + props.abilityname}
          abilityname={props.abilityname}
        />
      </Button>
    </React.Fragment>
  );

};

export default AbilityImage;
