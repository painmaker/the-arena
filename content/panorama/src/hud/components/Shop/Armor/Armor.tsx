import React from "react";
import { items } from "../../../data/shop";
import Item from "../Item/Item";
import ParentStyles from './../shop.module.css';

type Props = {
  selectedUnit: EntityIndex,
}

const Armor = (props: Props) => {

  // $.Msg("REACT-RENDER: Shop - Armor rendered");

  const { selectedUnit } = props;

  return (
    <Panel className={ParentStyles.category}>
      <Label className={ParentStyles.categoryTitleLabel} text={'Armor'} />
      <Panel className={ParentStyles.categoryItems}>
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
