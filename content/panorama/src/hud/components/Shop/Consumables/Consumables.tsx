import React from "react";
import { items } from "../../../data/shop";
import Item from "../Item/Item";

type Props = {
  selectedUnit: EntityIndex,
}

const Consumables = (props: Props) => {

  // $.Msg("REACT-RENDER: Shop - Consumables rendered");

  const { selectedUnit } = props;

  return (
    <Panel className={'shopCategory'}>
      <Label className={'shopCategoryTitleLabel'} text={'Consumables'} />
      <Panel className={"shopCategoryItems"}>
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
