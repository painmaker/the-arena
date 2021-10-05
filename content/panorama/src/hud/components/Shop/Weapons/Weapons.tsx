import React from "react";
import { items } from "../../../data/shop";
import Item from "../Item/Item";

type Props = {
  selectedUnit: EntityIndex,
}

const Weapons = (props: Props) => {

  // $.Msg("REACT-RENDER: Shop - Weapons rendered");

  const { selectedUnit } = props;

  return (
    <Panel className={'shopCategory'}>
      <Label className={'shopCategoryTitleLabel'} text={'Weapons'} />
      <Panel className={"shopCategoryItems"}>
        {items.weapons.map(item =>
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

export default Weapons;
