import React from "react";
import { items } from "../../../data/shop";
import Item from "../Item/Item";

type Props = {
  selectedUnit: EntityIndex,
}

const Armor = (props: Props) => {

  $.Msg("REACT-RENDER: Shop - Armor rendered");

  const { selectedUnit } = props;

  return (
    <Panel className={'shopCategory'}>
      <Label className={'shopCategoryTitleLabel'} text={'Armor'} />
      <Panel className={"shopCategoryItems"}>
        {items.armor.map(item =>
          <Item
            key={item.itemname}
            item={item}
            selectedUnit={selectedUnit}
          />
        )}
      </Panel>
    </Panel>
  );
};

export default Armor;
