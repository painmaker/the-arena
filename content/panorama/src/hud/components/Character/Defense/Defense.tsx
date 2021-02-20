import React from "react";
import Divider from "../Divider/Divider";
import Armor from "./Armor/Armor";
import Evasion from "./Evasion/Evasion";
import HealthRegen from "./HealthRegen/HealthRegen";
import MagicalResistance from "./MagicalResistance/MagicalResistance";
import PyshicalResistance from "./PyshicalResistance/PyshicalResistance";
import StatusResistance from "./StatusResistance/StatusResistance";

const Defense = () => {
  return (
    <Panel hittest={false} className={'defensePanelContainer'}>
      <Panel className={'defensePanelBackground'}>
        <Label text={'DEFENSE'} className={'characterPanelComponentTitleLabel defensePanelTitle'} />
        <Divider />
        <Panel className={'defensePanelLabelContainer'}>
          <Armor />
          <PyshicalResistance />
          <MagicalResistance />
          <StatusResistance />
          <Evasion />
          <HealthRegen />
        </Panel>
      </Panel>
    </Panel>
  );
};

export default Defense;
