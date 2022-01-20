import React, { useState } from "react";
import { Styles } from "./Styles";
import Model from "./Model/Model";
import Defense from "./Defense/Defense";
import Title from "./Title/Title"
import Level from "./Level/Level";
import Avatar from "./Avatar/Avatar";
import Attack from "./Attack/Attack";
import { HUD_THINK_SLOW, SelectedUnitContext, WindowContext } from "../../App";
import { useTimeout } from "../../hooks/useTimeout";
import { useRegisterForUnhandledEvent } from "react-panorama";
import { WINDOW } from "../../data/windows";

const CharacterDetails = () => {

  // $.Msg("REACT-RENDER: Character rendered");

  const { selectedUnit } = React.useContext(SelectedUnitContext);
  const { window, setWindow } = React.useContext(WindowContext);

  const [renderComponent, setRenderComponent] = useState(false);

  useTimeout(() => {
    setRenderComponent(window === WINDOW.CHARACTER_DETAILS);
  }, window !== WINDOW.CHARACTER_DETAILS ? HUD_THINK_SLOW : 0);

  useRegisterForUnhandledEvent('Cancelled', () => {
    if (window === WINDOW.CHARACTER_DETAILS) {
      Game.EmitSound("ui_topmenu_select");
      setWindow(WINDOW.NONE);
    }
  }, [window, setWindow]);

  return (
    <Panel hittest={false} style={Styles.OuterContainer()}>
      {renderComponent && (
        <React.Fragment>
          <Panel style={Styles.InnerContainer(window === WINDOW.CHARACTER_DETAILS)}>
            <Title selectedUnit={selectedUnit} />
            <Panel style={Styles.ColumnContainer()}>
              <Panel style={Styles.LeftColumn()}>
                <Model selectedUnit={selectedUnit} />
                <Level selectedUnit={selectedUnit} />
                <Avatar selectedUnit={selectedUnit} />
              </Panel>
              <Panel style={Styles.RightColumn()}>
                <Attack selectedUnit={selectedUnit} />
                <Defense selectedUnit={selectedUnit} />
              </Panel>
            </Panel>
          </Panel>
        </React.Fragment>
      )}
    </Panel>
  );

};

export default React.memo(CharacterDetails);
