import React from "react";
import AbilitiesShopButton from "./AbilitiesShopButton/AbilitiesShopButton";
import CharaterButton from "./CharacterButton/CharaterButton";
import SettingsButton from "./SettingsButton/SettingsButton";
import ShoppingButton from "./ShoppingButton/ShoppingButton";
import { Styles } from "./Styles";

const ButtonGroup = () => {

  // $.Msg("REACT-RENDER: ButtonGroup rendered");

  return (
    <Panel hittest={false} style={Styles.Container()}>
      <Panel hittest={false} style={Styles.Entry()}>
        <SettingsButton />
      </Panel>
      <Panel hittest={false} style={Styles.Entry()}>
        <ShoppingButton />
      </Panel>
      <Panel hittest={false} style={Styles.Entry()}>
        <CharaterButton />
      </Panel>
      <Panel hittest={false} style={Styles.Entry()}>
        <AbilitiesShopButton />
      </Panel>
    </Panel>
  );

};

export default React.memo(ButtonGroup);
