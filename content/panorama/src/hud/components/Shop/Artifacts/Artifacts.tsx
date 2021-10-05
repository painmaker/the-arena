import React from "react";
import { items } from "../../../data/shop";
import Item from "../Item/Item";

type Props = {
  selectedUnit: EntityIndex,
}

const Artifacts = (props: Props) => {

  // $.Msg("REACT-RENDER: Shop - Artifacts rendered");

  const { selectedUnit } = props;

  return (
    <Panel className={'shopCategory'}>
      <Label className={'shopCategoryTitleLabel'} text={'Artifacts'} />
      <Panel className={"shopCategoryItems"}>
        {items.artifacts.map(item =>
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

export default Artifacts;
