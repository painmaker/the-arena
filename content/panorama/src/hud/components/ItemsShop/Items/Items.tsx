import React from "react";
import Item from "./Item/Item";
import Styles from './styles.module.css';
export interface ItemShopItem {
  itemname: string,
  cost: number,
  aliases: string[],
}

type Props = {
  title: string,
  items: ItemShopItem[]
}

const Items = (props: Props) => {

  // $.Msg("REACT-RENDER: ItemsShop - Items rendered");

  const { title, items } = props;

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
          />
        )}
      </Panel>
    </Panel>
  );
};

export default React.memo(Items);
