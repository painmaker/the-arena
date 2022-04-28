import React, { useEffect, useState } from "react";
import Title from "./Title/Title";
import Gold from "./Gold/Gold";
import Search from "./Search/Search";
import { HUD_THINK_SLOW } from "../../App";
import { useTimeout } from "../../hooks/useTimeout";
import { useGameEvent } from "react-panorama";
import Styles from './styles.module.css';
import { WINDOW } from "../../data/windows";
import Items from "./Items/Items";
import UpgradeTree from "./UpgradeTree/UpgradeTree";

type Props = {
  selectedUnit: EntityIndex,
}

const ItemsShop = (props: Props) => {

  // $.Msg("REACT-RENDER: ItemsShop rendered");

  const { selectedUnit } = props;

  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [renderComponent, setRenderComponent] = useState(false);

  const [activeItem, setActiveItem] = useState<ItemsShopItem | undefined>(undefined);
  const [consumables, setConsumables] = useState<ItemsShopItem[]>([]);
  const [basics, setBasics] = useState<ItemsShopItem[]>([]);

  useTimeout(() => {
    setRenderComponent(isOpen);
  }, !isOpen ? HUD_THINK_SLOW : 0);

  useGameEvent('set_window', (event) => {
    setIsOpen(event.window === WINDOW.ITEMS_SHOP);
  }, []);

  useEffect(() => {
    if (isOpen) {
      GameEvents.SendCustomGameEventToServer("fetch_items_shop_item", {});
    }
  }, [isOpen]);

  useGameEvent('fetch_items_shop_item_success', (event) => {
    setConsumables(Object.values(event.consumables) as ItemsShopItem[]);
    setBasics(Object.values(event.basics) as ItemsShopItem[]);
  }, []);

  return (
    <React.Fragment>
      {renderComponent && (
        <React.Fragment>
          <Panel
            onactivate={() => false}
            className={Styles.container}
            style={isOpen ? { transform: 'translateX(-10px)', opacity: '1.0' } : {}}
          >
            <Title selectedUnit={selectedUnit} />
            <Panel className={Styles.topBarContainer}>
              <Search setSearchValue={setSearchValue} />
              <Gold selectedUnit={selectedUnit} />
            </Panel>
            <Panel className={Styles.itemsContainer}>
              <Panel className={Styles.itemsColumn}>
                <Items
                  title={'Consumables'}
                  items={consumables}
                  selectedUnit={selectedUnit}
                  searchValue={searchValue}
                  setActiveItem={setActiveItem}
                  height={'165px'}
                />
                <Items
                  title={'Basics'}
                  items={basics}
                  selectedUnit={selectedUnit}
                  searchValue={searchValue}
                  setActiveItem={setActiveItem}
                  height={'165px'}
                />
              </Panel>
              <Panel className={Styles.itemsColumn}>
                <Items
                  title={'Upgrades'}
                  items={[]}
                  selectedUnit={selectedUnit}
                  searchValue={searchValue}
                  setActiveItem={setActiveItem}
                  height={'362px'}
                />
              </Panel>
            </Panel>
            {/*<UpgradeTree activeItem={activeItem} /> */}
          </Panel>
        </React.Fragment>
      )}
    </React.Fragment>
  );

};

export default React.memo(ItemsShop);
