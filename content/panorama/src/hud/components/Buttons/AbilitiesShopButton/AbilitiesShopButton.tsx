import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import { WINDOW } from "../../../data/windows";
import ParentStyles from './../styles.module.css';

const AbilitiesShopButton = () => {

  // $.Msg("REACT-RENDER: AbilitiesShopButton rendered");

  const [isOpen, setIsOpen] = useState(false);

  useGameEvent('set_window', (event) => {
    setIsOpen(event.window === WINDOW.ABILITIES_SHOP);
  }, []);

  return (
    <Button
      id={'abilities_shop_btn'}
      className={ParentStyles.btn}
      onactivate={() => {
        $('#abilities_shop_btn').RemoveClass('btnClicked');
        $('#abilities_shop_btn').AddClass('btnClicked');
        GameEvents.SendEventClientSide('set_window', { window: isOpen ? WINDOW.NONE : WINDOW.ABILITIES_SHOP });
        Game.EmitSound("ui_topmenu_select");
      }}>
      <Image
        style={{ washColor: isOpen ? 'orange' : 'white' }}
        src={'s2r://panorama/images/book_open_page_variant_outline_png.vtex'}
      />
    </Button>
  );

};

export default React.memo(AbilitiesShopButton);
