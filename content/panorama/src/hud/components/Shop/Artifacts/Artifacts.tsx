import React from "react";
import { items } from "../../../data/shop";
import Item from "../Item/Item";
import ParentStyles from './../shop.module.css';

type Props = {
  selectedUnit: EntityIndex,
}

const Artifacts = (props: Props) => {

  // $.Msg("REACT-RENDER: Shop - Artifacts rendered");

  const { selectedUnit } = props;

  return (
    <Panel className={ParentStyles.category}>
      <Label className={ParentStyles.categoryTitleLabel} text={'Artifacts'} />
      <Panel className={ParentStyles.categoryItems}>
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
