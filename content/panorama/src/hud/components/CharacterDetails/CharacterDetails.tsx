import React, { useState } from "react";
import { Styles } from "./Styles";
import Model from "./Model/Model";
import Defense from "./Defense/Defense";
import Title from "./Title/Title"
import Level from "./Level/Level";
import Avatar from "./Avatar/Avatar";
import Attack from "./Attack/Attack";
import { HUD_THINK_SLOW } from "../../App";
import { useTimeout } from "../../hooks/useTimeout";
import { useGameEvent } from "react-panorama";
import { WINDOW } from "../../data/windows";

const CharacterDetails = () => {

  // $.Msg("REACT-RENDER: CharacterDetails rendered");

  const [isOpen, setIsOpen] = useState(false);
  const [renderComponent, setRenderComponent] = useState(false);

  useTimeout(() => {
    setRenderComponent(isOpen);
  }, !isOpen ? HUD_THINK_SLOW : 0);

  useGameEvent('set_window', (event) => {
    setIsOpen(event.window === WINDOW.CHARACTER_DETAILS);
  }, []);

  return (
    <Panel hittest={false} style={Styles.OuterContainer()}>
      {renderComponent && (
        <React.Fragment>
          <Panel style={Styles.InnerContainer(isOpen)}>
            <Title />
            <Panel style={Styles.ColumnContainer()}>
              <Panel style={Styles.LeftColumn()}>
                <Model />
                <Level />
                <Avatar />
              </Panel>
              <Panel style={Styles.RightColumn()}>
                <Attack />
                <Defense />
              </Panel>
            </Panel>
          </Panel>
        </React.Fragment>
      )}
    </Panel>
  );

};

export default React.memo(CharacterDetails);
