import React, { useContext, useLayoutEffect } from "react";
import Level from "./Level/Level";
import Armor from "./Armor/Armor";
import Damage from "./Damage/Damage";
import MagicResistance from "./MagicResistance/MagicResistance";
import MoveSpeed from "./MoveSpeed/MoveSpeed";
import Attributes from "./Attributes/Attributes";
import Styles from "./styles.module.css"
import SelectedEntityIndexContext from "../../context/SelectedEntityIndexContext";

const SelectedEntity = () => {

  // $.Msg("REACT-RENDER: SelectedEntity rendered");

  const { selectedEntityIndex } = useContext(SelectedEntityIndexContext);

  useLayoutEffect(() => {
    const scenePanel = $('#selected_unit_portrait') as ScenePanel;
    if (scenePanel) {
      scenePanel.SetUnit(Entities.GetUnitName(selectedEntityIndex), '', true);
    }
  }, [selectedEntityIndex])

  return (
    <Panel className={Styles.container} hittest={true}>
      <DOTAScenePanel
        key={selectedEntityIndex}
        id={'selected_unit_portrait'}
        className={Styles.heroImage}
      />
      <Panel className={Styles.rowContainer}>
        <Panel className={Styles.row1}>
          <Panel className={Styles.leftColumn}>
            <Panel className={Styles.leftColumnTitleContainer}>
              <Label
                className={Styles.heroLabel}
                text={$.Localize('#' + Entities.GetUnitName(selectedEntityIndex))}
              />
            </Panel>
            <Panel className={Styles.leftColumnContentContainer}>
              <Panel className={Styles.columnContent}>
                {Entities.IsHero(selectedEntityIndex) && (
                  <Attributes selectedEntityIndex={selectedEntityIndex} />
                )}
              </Panel>
            </Panel>
          </Panel>
          <Panel className={Styles.rightColumn}>
            <Panel className={Styles.columnContent}>
              <Armor selectedEntityIndex={selectedEntityIndex} />
              <MagicResistance selectedEntityIndex={selectedEntityIndex} />
              <Damage selectedEntityIndex={selectedEntityIndex} />
              <MoveSpeed selectedEntityIndex={selectedEntityIndex} />
            </Panel>
          </Panel>
        </Panel>
        <Panel className={Styles.row2}>
          <Level selectedEntityIndex={selectedEntityIndex} />
        </Panel>
      </Panel>
    </Panel>
  );

};

export default React.memo(SelectedEntity);
