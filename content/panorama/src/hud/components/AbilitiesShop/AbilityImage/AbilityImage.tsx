import React, { useEffect, useState } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { Styles } from "./Styles";

type Props = ReactTimeoutProps & {
  selectedUnit: EntityIndex,
  shopAbility: ShopAbility,
  searchValue: string,
}

const onMouseOver = (selectedUnit: EntityIndex, abilityname: string) => {
  $.DispatchEvent(
    "DOTAShowAbilityTooltipForEntityIndex",
    $("#ability_shop_image_" + abilityname),
    abilityname,
    selectedUnit
  )
}

const onMouseOut = (abilityname: string) => {
  $.DispatchEvent("DOTAHideAbilityTooltip", $("#ability_shop_image_" + abilityname));
}

const onRightClick = (selectedUnit: EntityIndex, abilityname: string) => {
  $.Msg("onRightClick: " + abilityname)
  GameEvents.SendCustomGameEventToServer("purchase_ability", { entindex: selectedUnit, abilityname });
}

const AbilityImage = (props: Props) => {

  $.Msg("REACT-RENDER: AbilitiesShop - AbilityImage rendered");

  const { selectedUnit, shopAbility, searchValue, setInterval, clearInterval } = props;
  const { name, aliases, requiredLevel } = shopAbility;

  const [isRequiredLevel, setIsRequiredLevel] = useState(Entities.GetLevel(selectedUnit) >= requiredLevel);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {

    const update = () => {
      setIsRequiredLevel(Entities.GetLevel(selectedUnit) >= requiredLevel);
    };

    // update();
    const id = setInterval(update, HUD_THINK_MEDIUM);

    return () => clearInterval(id);

  }, [selectedUnit, setInterval, clearInterval]);

  useEffect(() => {
    let isSearched = false;
    Object.values(aliases).forEach(alias => {
      if (alias.match(searchValue)) {
        isSearched = true;
      }
    });
    setIsSearched(isSearched);
  }, [aliases, searchValue])

  return (
    <React.Fragment>
      <Button
        style={Styles.AbilityImage(searchValue.length > 0, isSearched, isRequiredLevel)}
        oncontextmenu={() => onRightClick(selectedUnit, name)}
        onmouseout={() => onMouseOut(name)}
        onmouseover={() => onMouseOver(selectedUnit, name)}
      >
        <DOTAAbilityImage
          id={'ability_shop_image_' + name}
          abilityname={name}
        />
      </Button>
    </React.Fragment>
  );

};

export default React.memo(withReactTimeout(AbilityImage));
