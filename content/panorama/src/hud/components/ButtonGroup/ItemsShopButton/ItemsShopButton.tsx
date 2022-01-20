import React from "react";
import { WindowContext } from "../../../App";
import { WINDOW } from "../../../data/windows";
import ParentStyles from './../styles.module.css';

const ItemsShopButton = () => {

  // $.Msg("REACT-RENDER: ItemsShopButton rendered");

  const { window, setWindow } = React.useContext(WindowContext);

  const isOpen = window === WINDOW.ITEMS_SHOP;

  return (
    <Button
      id={'item_shopping_btn'}
      className={ParentStyles.btn}
      onactivate={() => {
        $('#item_shopping_btn').RemoveClass('btnClicked');
        $('#item_shopping_btn').AddClass('btnClicked');
        setWindow(isOpen ? WINDOW.NONE : WINDOW.ITEMS_SHOP);
        Game.EmitSound("ui_topmenu_select");
      }}
    >
      <Image
        style={{ washColor: isOpen ? 'orange' : 'white' }}
        src="s2r://panorama/images/shop_btn_white_png.vtex"
      />
    </Button>
  );

};

export default React.memo(ItemsShopButton);
