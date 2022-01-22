import React from "react";
import { WindowContext } from "../../../App";
import { WINDOW } from "../../../data/windows";
import Styles from "./styles.module.css";

const Title = () => {

  // $.Msg("REACT-RENDER: Settings - Title rendered");

  const { window, setWindow } = React.useContext(WindowContext);

  return (
    <Panel className={Styles.container}>
      <Label
        className={Styles.label}
        text={"SETTINGS - " + $.Localize(Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))).toUpperCase()}
      />
      <Button
        className={Styles.closeBtn}
        onactivate={() => {
          if (window === WINDOW.SETTINGS) {
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

