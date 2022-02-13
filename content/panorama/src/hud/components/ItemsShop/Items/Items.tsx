import React from "react";
import Item from "./Item/Item";
import Styles from './styles.module.css';

type Props = {
  title: string,
  items: ItemsShopItem[]
  selectedUnit: EntityIndex,
  searchValue: string
}

const Items = (props: Props) => {

  // $.Msg("REACT-RENDER: ItemsShop - Items rendered");

  const { title, items, selectedUnit, searchValue } = props;

  return (
    <Panel className={Styles.container}>
      <Label
        className={Styles.title}
        text={title}
      />
      <Panel className={Styles.itemsContainer}>
        {items.map(item =>
          <Item
            key={item.itemname}
            item={item}
            selectedUnit={selectedUnit}
            searchValue={searchValue}
          />
        )}
      </Panel>
    </Panel>
  );
};

export default React.memo(Items);
