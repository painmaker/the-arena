import React, { useState } from "react";
import { SelectedUnitContext, WindowContext } from "../../../App";
import { WINDOW } from "../../../data/windows";
import Styles from './styles.module.css';

const Title = () => {

  // $.Msg("REACT-RENDER: AbilitiesShop - Title rendered");

  const { selectedUnit } = React.useContext(SelectedUnitContext);
  const { window, setWindow } = React.useContext(WindowContext);

  return (
    <Panel className={Styles.container}>
      <Label
        className={Styles.label}
        text={"ABILITIES SHOP - " + $.Localize(Entities.GetUnitName(selectedUnit)).toUpperCase()}
      />
      <Button
        className={Styles.closeBtn}
        onactivate={() => {
          if (window === WINDOW.ABILITIES_SHOP) {
            setWindow(WINDOW.NONE);
            Game.EmitSound("ui_topmenu_select");
          }
        }}
      >
        <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
      </Button>
    </Panel>
  );

};

export default React.memo(Title);
