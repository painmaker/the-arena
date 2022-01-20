import React from "react";
import { items } from "../../../data/items";
import Item from "../Item/Item";
import ParentStyles from './../styles.module.css';

const Weapons = () => {

  // $.Msg("REACT-RENDER: ItemsShop - Weapons rendered");

  return (
    <Panel className={ParentStyles.category}>
      <Label className={ParentStyles.categoryTitleLabel} text={'Weapons'} />
      <Panel className={ParentStyles.categoryItems}>
        {items.weapons.map(item =>
          <Item
            key={item.itemname}
            item={item}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default React.memo(Weapons);
