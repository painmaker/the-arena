import React from "react";
import { items } from "../../../data/items";
import Item from "../Item/Item";
import ParentStyles from './../styles.module.css';


const Artifacts = () => {

  // $.Msg("REACT-RENDER: ItemsShop - Artifacts rendered");

  return (
    <Panel className={ParentStyles.category}>
      <Label className={ParentStyles.categoryTitleLabel} text={'Artifacts'} />
      <Panel className={ParentStyles.categoryItems}>
        {items.artifacts.map(item =>
          <Item
            key={item.itemname}
            item={item}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default React.memo(Artifacts);
