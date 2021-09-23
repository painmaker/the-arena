import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  entindex: EntityIndex,
  shopAbility: ShopAbility,
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

  const { entindex, shopAbility, searchValue, setInterval, clearInterval } = props;
  const { name, aliases, requiredLevel } = shopAbility;

  const [isRequiredLevel, setIsRequiredLevel] = useState(Entities.GetLevel(entindex) >= requiredLevel);
  const [isSearched, setIsSearched] = useState(false);
  const [hasSearchedValue, setHasSearchedValue] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIsRequiredLevel(Entities.GetLevel(entindex) >= requiredLevel);
    }, 250);
    return () => clearInterval(id);
  }, [entindex, setInterval, clearInterval]);

  useEffect(() => {
    let isSearched = false;
    Object.values(aliases).forEach(alias => {
      if (alias.match(searchValue)) {
        isSearched = true;
      }
    });
    setIsSearched(isSearched);
  }, [aliases])

  useEffect(() => {
    setHasSearchedValue(searchValue.length > 0);
  }, [searchValue])

  return (
    <React.Fragment>
      <Button
        style={Styles.AbilityImage(hasSearchedValue, isSearched, isRequiredLevel)}
        oncontextmenu={() => onRightClick(entindex, name)}
        onmouseout={() => onMouseOut(name)}
        onmouseover={() => onMouseOver(entindex, name)}
      >
        <DOTAAbilityImage
          id={'ability_shop_image_' + name}
          abilityname={name}
        />
      </Button>
    </React.Fragment>
  );

};

export default withReactTimeout(AbilityImage);
