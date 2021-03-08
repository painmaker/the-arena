import React from "react";
import { items } from "../../../data/shop";
import Item from "../Item/Item";

const Armor = () => {
  return (
    <Panel className={'shopCategory'}>
      <Label className={'shopCategoryTitleLabel'} text={'Armor'} />
      <Panel className={"shopCategoryItems"}>
        {items.armor.map(item =>
          <Item item={item} key={item.itemname} />
        )}
      </Panel>
    </Panel>
  );
};

export default Armor;
