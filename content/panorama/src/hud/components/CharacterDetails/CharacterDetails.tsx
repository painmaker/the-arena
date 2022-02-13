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

type Props = {
  selectedUnit: EntityIndex,
}

const CharacterDetails = (props: Props) => {

  // $.Msg("REACT-RENDER: CharacterDetails rendered");

  const { selectedUnit } = props;

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
