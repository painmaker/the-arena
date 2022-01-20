import React from "react";
import { WindowContext } from "../../../App";
import { WINDOW } from "../../../data/windows";
import ParentStyles from './../styles.module.css';

const SettingsButton = () => {

  // $.Msg("REACT-RENDER: SettingsButton rendered");

  const { window, setWindow } = React.useContext(WindowContext);

  const isOpen = window === WINDOW.SETTINGS;

  return (
    <Button
      id={'settings_btn'}
      className={ParentStyles.btn}
      onactivate={() => {
        $('#settings_btn').RemoveClass('btnClicked');
        $('#settings_btn').AddClass('btnClicked');
        setWindow(isOpen ? WINDOW.NONE : WINDOW.SETTINGS);
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
