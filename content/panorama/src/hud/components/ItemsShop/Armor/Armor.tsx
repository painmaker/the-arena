import React from "react";
import { SelectedUnitContext } from "../../../App";
import { items } from "../../../data/items";
import Item from "../Item/Item";
import ParentStyles from './../styles.module.css';

const Armor = () => {

  // $.Msg("REACT-RENDER: ItemsShop - Armor rendered");

  return (
    <Panel className={ParentStyles.category}>
      <Label className={ParentStyles.categoryTitleLabel} text={'Armor'} />
      <Panel className={ParentStyles.categoryItems}>
        {items.armor.map(item =>
          <Item
            key={item.itemname}
            item={item}
          />
        )}
      </Panel>
    </Panel>
  );
};

export default React.memo(Armor);
