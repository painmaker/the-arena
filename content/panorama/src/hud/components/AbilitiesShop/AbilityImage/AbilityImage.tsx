import React, { useEffect, useState, useRef } from "react";
import { HUD_THINK_MEDIUM } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import { Styles } from "./Styles";

type Props = {
  selectedUnit: EntityIndex,
  shopAbility: ShopAbility,
  searchValue: string,
}

let animationSchedule: ScheduleID = -1 as ScheduleID;

const AbilityImage = (props: Props) => {

  // $.Msg("REACT-RENDER: AbilitiesShop - AbilityImage rendered");

  const { selectedUnit, shopAbility, searchValue } = props;
  const { name, aliases, requiredLevel } = shopAbility;

  const [isRequiredLevel, setIsRequiredLevel] = useState(Entities.GetLevel(selectedUnit) >= requiredLevel);
  const [isSearched, setIsSearched] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useInterval(() => {
    setIsRequiredLevel(Entities.GetLevel(selectedUnit) >= requiredLevel);
  }, HUD_THINK_MEDIUM);

  useEffect(() => {
    let isSearched = false;
    Object.values(aliases).forEach(alias => {
      if (alias.match(searchValue)) {
        isSearched = true;
      }
    });
    setIsSearched(isSearched);
  }, [aliases, searchValue])

  const hasSearchValue = searchValue.length > 0;

  return (
    <Button
      className={'container'}
      id={"ability_shop_image_" + name}
      style={Styles.AbilityImage(hasSearchValue, isSearched, isRequiredLevel, isHovering)}
      oncontextmenu={() => {
        $('#ability_shop_image_' + name).RemoveClass('btnClicked');
        $('#ability_shop_image_' + name).AddClass('btnClicked');
        GameEvents.SendCustomGameEventToServer("purchase_ability", { entindex: selectedUnit, abilityname: name });
      }}
      onmouseout={() => {
        setIsHovering(false);
        $.DispatchEvent("DOTAHideAbilityTooltip", $("#ability_shop_image_" + name));
      }}
      onmouseover={() => {
        setIsHovering(true);
        $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", $("#ability_shop_image_" + name), name, selectedUnit);
      }}
    >
      <DOTAAbilityImage abilityname={name} />
    </Button>
  );

};

export default React.memo(AbilityImage);
