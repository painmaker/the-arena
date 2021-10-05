import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_MEDIUM } from "../../../App";
import { Styles } from "./Styles";

type Props = {
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

  // $.Msg("REACT-RENDER: AbilitiesShop - AbilityImage rendered");

  const { selectedUnit, shopAbility, searchValue } = props;
  const { name, aliases, requiredLevel } = shopAbility;

  const [isRequiredLevel, setIsRequiredLevel] = useState(Entities.GetLevel(selectedUnit) >= requiredLevel);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      setIsRequiredLevel(Entities.GetLevel(selectedUnit) >= requiredLevel);
      schedule = $.Schedule(SCHEDULE_THINK_MEDIUM, update);
    };
    update();
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }
  }, [selectedUnit]);

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

export default React.memo(AbilityImage);
