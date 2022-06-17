import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import { WINDOW } from "../../../data/windows";
import ParentStyles from './../styles.module.css';

const CharaterDetailsButton = () => {

  // $.Msg("REACT-RENDER: CharaterDetailsButton rendered");

  const [isOpen, setIsOpen] = useState(false);

  useGameEvent('set_window', (event) => {
    setIsOpen(event.window === WINDOW.CHARACTER_DETAILS);
  }, []);

  return (
    <Button
      id={'character_btn'}
      className={ParentStyles.btn}
      onactivate={() => {
        $('#character_btn').RemoveClass('btnClicked');
        $('#character_btn').AddClass('btnClicked');
        GameEvents.SendEventClientSide('set_window', { window: isOpen ? WINDOW.NONE : WINDOW.CHARACTER_DETAILS });
        Game.EmitSound("ui_topmenu_select");
      }}
    >
      <Image
        style={{ washColor: isOpen ? 'orange' : 'white' }}
        src={'s2r://panorama/images/character_btn_white_png.vtex'}
      />
    </Button>
  );

};

export default React.memo(CharaterDetailsButton);
