import React from "react";
import Divider from "../Divider/Divider";
import Armor from "./Armor/Armor";
import Evasion from "./Evasion/Evasion";
import HealthRegen from "./HealthRegen/HealthRegen";
import MagicalResistance from "./MagicalResistance/MagicalResistance";
import PyshicalResistance from "./PyshicalResistance/PyshicalResistance";
import StatusResistance from "./StatusResistance/StatusResistance";
import { Styles } from "./Styles";

interface Props {
  selectedUnit: EntityIndex,
}

const Defense = (props: Props) => {

  $.Msg("REACT-RENDER: Character - Defense rendered");

  const { selectedUnit } = props;

  return (
    <Panel style={Styles.OuterContainer()}>
      <Label text={'DEFENSE'} style={Styles.Title()} />
      <Divider />
      <Panel style={Styles.InnerContainer()}>
        <Armor selectedUnit={selectedUnit} />
        <PyshicalResistance selectedUnit={selectedUnit} />
        <MagicalResistance selectedUnit={selectedUnit} />
        <StatusResistance selectedUnit={selectedUnit} />
        <Evasion selectedUnit={selectedUnit} />
        <HealthRegen selectedUnit={selectedUnit} />
      </Panel>
    </Panel>
  );

};

export default React.memo(Defense);
