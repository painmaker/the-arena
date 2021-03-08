import React from "react";
import { items } from "../../../data/shop";
import Item from "../Item/Item";

const Artifacts = () => {
  return (
    <Panel className={'shopCategory'}>
      <Label className={'shopCategoryTitleLabel'} text={'Artifacts'} />
      <Panel className={"shopCategoryItems"}>
        {items.artifacts.map(item =>
          <Item item={item} key={item.itemname} />
        )}
      </Panel>
    </Panel>
  );
};

export default Artifacts;
