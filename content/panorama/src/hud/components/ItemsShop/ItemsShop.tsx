import React, { Dispatch, SetStateAction, useState } from "react";
import Title from "./Title/Title";
import Gold from "./Gold/Gold";
import Search from "./Search/Search";
import Consumables from "./Consumables/Consumables";
import Armor from "./Armor/Armor";
import Weapons from "./Weapons/Weapons";
import Artifacts from "./Artifacts/Artifacts";
import { HUD_THINK_SLOW, WindowContext } from "../../App";
import { useTimeout } from "../../hooks/useTimeout";
import { useRegisterForUnhandledEvent } from "react-panorama";
import Styles from './styles.module.css';
import { WINDOW } from "../../data/windows";

interface ItemsShopContext {
  searchValue: string,
  setSearchValue: Dispatch<SetStateAction<string>>
}

export const ItemsShopContext = React.createContext<ItemsShopContext>({
  searchValue: '',
  setSearchValue: () => { }
});

const ItemsShop = () => {

  // $.Msg("REACT-RENDER: ItemsShop rendered");

  const { window, setWindow } = React.useContext(WindowContext);

  const [searchValue, setSearchValue] = useState('');
  const [renderComponent, setRenderComponent] = useState(false);

  useTimeout(() => {
    setRenderComponent(window === WINDOW.ITEMS_SHOP);
  }, window !== WINDOW.ITEMS_SHOP ? HUD_THINK_SLOW : 0);

  useRegisterForUnhandledEvent('Cancelled', () => {
    if (window === WINDOW.ITEMS_SHOP) {
      Game.EmitSound("ui_topmenu_select");
      setWindow(WINDOW.NONE)
    }
  }, [window, setWindow]);

  return (
    <ItemsShopContext.Provider value={{ searchValue, setSearchValue }}>
      {renderComponent && (
        <React.Fragment>
          <Panel
            className={Styles.container}
            style={window === WINDOW.ITEMS_SHOP ? { transform: 'translateX(-10px)', opacity: '1.0' } : {}}
          >
            <Title />
            <Panel className={Styles.topBarContainer}>
              <Search />
              <Gold />
            </Panel>
            <Panel className={Styles.itemsContainer}>
              <Panel className={Styles.itemsColumn}>
                <Consumables />
                <Artifacts />
              </Panel>
              <Panel className={Styles.itemsColumn}>
                <Armor />
                <Weapons />
              </Panel>
            </Panel>
          </Panel>
        </React.Fragment>
      )}
    </ItemsShopContext.Provider>
  );

};

export default React.memo(ItemsShop);
