import React, { useContext, useEffect } from "react";
import Level from "./Level/Level";
import Armor from "./Armor/Armor";
import Damage from "./Damage/Damage";
import MagicResistance from "./MagicResistance/MagicResistance";
import MoveSpeed from "./MoveSpeed/MoveSpeed";
import Attributes from "./Attributes/Attributes";
import Styles from "./styles.module.css"
import SelectedEntityIndexContext from "../../context/SelectedEntityIndexContext";

const Character = () => {

  // $.Msg("REACT-RENDER: Character rendered");

  const { selectedEntityIndex } = useContext(SelectedEntityIndexContext);

  useEffect(() => {
    const scenePanel = $('#selected_unit_portrait') as ScenePanel;
    scenePanel.SetUnit(Entities.GetUnitName(selectedEntityIndex), "", false);
  }, [selectedEntityIndex])

  return (
    <Panel className={Styles.container} hittest={true}>
      <DOTAScenePanel
        className={Styles.heroImage}
        id={"selected_unit_portrait"}
        key={Entities.GetUnitName(selectedEntityIndex)}
      />
      <Panel className={Styles.rowContainer}>
        <Panel className={Styles.row1}>
          <Panel className={Styles.leftColumn}>
            <Panel className={Styles.leftColumnTitleContainer}>
              <Label
                className={Styles.heroLabel}
                text={$.Localize("#" + Entities.GetUnitName(selectedEntityIndex))}
              />
            </Panel>
            <Panel className={Styles.leftColumnContentContainer}>
              <Panel className={Styles.columnContent}>
                {Entities.IsHero(selectedEntityIndex) && (
                  <Attributes selectedUnit={selectedEntityIndex} />
                )}
              </Panel>
            </Panel>
          </Panel>
          <Panel className={Styles.rightColumn}>
            <Panel className={Styles.columnContent}>
              <Armor selectedUnit={selectedEntityIndex} />
              <MagicResistance selectedUnit={selectedEntityIndex} />
              <Damage selectedUnit={selectedEntityIndex} />
              <MoveSpeed selectedUnit={selectedEntityIndex} />
            </Panel>
          </Panel>
        </Panel>
        <Panel className={Styles.row2}>
          <Level selectedUnit={selectedEntityIndex} />
        </Panel>
      </Panel>
    </Panel>
  );

};

export default React.memo(Character);
