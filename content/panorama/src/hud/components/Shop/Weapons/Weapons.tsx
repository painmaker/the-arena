import React from "react";
import { items } from "../../../data/shop";
import Item from "../Item/Item";

const Weapons = () => {
  return (
    <Panel className={'shopCategory'}>
      <Label className={'shopCategoryTitleLabel'} text={'Weapons'} />
      <Panel className={"shopCategoryItems"}>
        {items.weapons.map(item =>
          <Item item={item} key={item.itemname} />
        )}
      </Panel>
    </Panel>
  );
};

export default Weapons;
