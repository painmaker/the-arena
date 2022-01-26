import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import { WINDOW } from "../../../data/windows";
import ParentStyles from './../styles.module.css';

const SettingsButton = () => {

  // $.Msg("REACT-RENDER: SettingsButton rendered");

  const [isOpen, setIsOpen] = useState(false);

  useGameEvent('set_window', (event) => {
    setIsOpen(event.window === WINDOW.SETTINGS);
  }, []);

  return (
    <Button
      id={'settings_btn'}
      className={ParentStyles.btn}
      onactivate={() => {
        $('#settings_btn').RemoveClass('btnClicked');
        $('#settings_btn').AddClass('btnClicked');
        GameEvents.SendEventClientSide('set_window', { window: isOpen ? WINDOW.NONE : WINDOW.SETTINGS });
        Game.EmitSound("ui_topmenu_select");
      }}
    >
      <Image
        style={{ washColor: isOpen ? 'orange' : 'white' }}
        src="s2r://panorama/images/settings_btn_white_png.vtex"
      />
    </Button>
  );

};

export default React.memo(SettingsButton);
