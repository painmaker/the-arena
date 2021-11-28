import React from "react";
import AbilitiesShopButton from "./AbilitiesShopButton/AbilitiesShopButton";
import CharaterButton from "./CharacterButton/CharaterButton";
import SettingsButton from "./SettingsButton/SettingsButton";
import ShoppingButton from "./ShoppingButton/ShoppingButton";
import Styles from "./styles.module.css";

const ButtonGroup = () => {

  // $.Msg("REACT-RENDER: ButtonGroup rendered");

  return (
    <Panel hittest={true} className={Styles.container}>
      <SettingsButton />
      <ShoppingButton />
      <CharaterButton />
      <AbilitiesShopButton />
    </Panel >
  );

};

export default React.memo(ButtonGroup);
