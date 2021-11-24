import React from "react";
import { items } from "../../../data/shop";
import Item from "../Item/Item";
import ParentStyles from './../shop.module.css';

type Props = {
  selectedUnit: EntityIndex,
}

const Consumables = (props: Props) => {

  // $.Msg("REACT-RENDER: Shop - Consumables rendered");

  const { selectedUnit } = props;

  return (
    <Panel className={ParentStyles.category}>
      <Label className={ParentStyles.categoryTitleLabel} text={'Consumables'} />
      <Panel className={ParentStyles.categoryItems}>
        {items.consumables.map(item =>
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

export default Consumables;
