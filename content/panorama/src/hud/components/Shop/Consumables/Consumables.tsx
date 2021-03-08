import React from "react";
import { items } from "../../../data/shop";
import Item from "../Item/Item";

const Consumables = () => {
  return (
    <Panel className={'shopCategory'}>
      <Label className={'shopCategoryTitleLabel'} text={'Consumables'} />
      <Panel className={"shopCategoryItems"}>
        {items.consumables.map(item =>
          <Item item={item} key={item.itemname} />
        )}
      </Panel>
    </Panel>
  );
};

export default Consumables;
