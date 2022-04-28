import React from 'react';
import Styles from './styles.module.css';

type Props = {
  activeItem: ItemsShopItem,
}

const ActiveItem = (props: Props) => {

  const { activeItem } = props;

  return (
    <Panel className={Styles.container}>
      <DOTAItemImage
        className={Styles.image}
        itemname={activeItem.itemname}
      />
    </Panel>
  )

}

export default ActiveItem;