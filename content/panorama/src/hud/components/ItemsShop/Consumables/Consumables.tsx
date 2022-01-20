import React from "react";
import { items } from "../../../data/items";
import Item from "../Item/Item";
import ParentStyles from './../styles.module.css';

const Consumables = () => {

  // $.Msg("REACT-RENDER: ItemsShop - Consumables rendered");

  return (
    <Panel className={ParentStyles.category}>
      <Label className={ParentStyles.categoryTitleLabel} text={'Consumables'} />
      <Panel className={ParentStyles.categoryItems}>
        {items.consumables.map(item =>
          <Item
            key={item.itemname}
            item={item}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default React.memo(Consumables);
