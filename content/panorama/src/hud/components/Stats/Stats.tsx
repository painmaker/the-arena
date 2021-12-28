import React, { useEffect } from "react";
import Level from "./Level/Level";
import Armor from "./Armor/Armor";
import Damage from "./Damage/Damage";
import MagicResistance from "./MagicResistance/MagicResistance";
import MoveSpeed from "./MoveSpeed/MoveSpeed";
import Styles from "./stats.module.css"
import { Context } from "../../App";

const Stats = () => {

  // $.Msg("REACT-RENDER: Stats rendered");

  const { selectedUnit } = React.useContext(Context);

  useEffect(() => {
    const scenePanel = $('#selected_unit_portrait') as ScenePanel;
    scenePanel.SetUnit(Entities.GetUnitName(selectedUnit), "", false);
  }, [selectedUnit])

  return (
    <Panel className={Styles.container} hittest={true}>
      <DOTAScenePanel 
        className={Styles.heroImage}
        id={"selected_unit_portrait"}
        key={Entities.GetUnitName(selectedUnit)}
      />
      <Panel className={Styles.rowContainer}>
        <Panel className={Styles.row1}>
          <Label 
            className={Styles.heroLabel}
            text={$.Localize(Entities.GetUnitName(selectedUnit))}
          />
        </Panel>
        <Panel className={Styles.row2}>
          <Panel className={Styles.leftColumn}>
          </Panel>
          <Panel className={Styles.rightColumn}>
            <Panel className={Styles.columnContent}>
              <Armor />
              <Armor />
            </Panel>
          </Panel>
        </Panel>
        <Panel className={Styles.row3}>
          <Level />
        </Panel>
      </Panel> 
      {/* <MagicResistance selectedUnit={selectedUnit} /> */}
      {/* <Damage selectedUnit={selectedUnit} /> */}
      {/* <MoveSpeed selectedUnit={selectedUnit} /> */}
    </Panel>
  );

};

export default React.memo(Stats);
