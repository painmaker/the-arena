import React from "react";
import { WindowContext } from "../../../App";
import { WINDOW } from "../../../data/windows";
import ParentStyles from './../styles.module.css';

const AbilitiesShopButton = () => {

  // $.Msg("REACT-RENDER: AbilitiesShopButton rendered");

  const { window, setWindow } = React.useContext(WindowContext);

  const isOpen = window === WINDOW.ABILITIES_SHOP;

  return (
    <Button
      id={'abilities_shop_btn'}
      className={ParentStyles.btn}
      onactivate={() => {
        $('#abilities_shop_btn').RemoveClass('btnClicked');
        $('#abilities_shop_btn').AddClass('btnClicked');
        setWindow(isOpen ? WINDOW.NONE : WINDOW.ABILITIES_SHOP);
        Game.EmitSound("ui_topmenu_select");
      }}>
      <Image
        style={{ washColor: isOpen ? 'orange' : 'white' }}
        src="s2r://panorama/images/book_open_page_variant_outline_png.vtex"
      />
    </Button>
  );

};

export default React.memo(AbilitiesShopButton);
