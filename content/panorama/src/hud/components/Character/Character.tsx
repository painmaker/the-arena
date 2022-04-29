import React, { useEffect } from "react";
import Level from "./Level/Level";
import Armor from "./Armor/Armor";
import Damage from "./Damage/Damage";
import MagicResistance from "./MagicResistance/MagicResistance";
import MoveSpeed from "./MoveSpeed/MoveSpeed";
import Attributes from "./Attributes/Attributes";
import Styles from "./styles.module.css"

type Props = {
  selectedUnit: EntityIndex,
}

const Character = (props: Props) => {

  // $.Msg("REACT-RENDER: Character rendered");

  const { selectedUnit } = props;

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
          <Panel className={Styles.leftColumn}>
            <Panel className={Styles.leftColumnTitleContainer}>
              <Label
                className={Styles.heroLabel}
                text={$.Localize("#" + Entities.GetUnitName(selectedUnit))}
              />
            </Panel>
            <Panel className={Styles.leftColumnContentContainer}>
              <Panel className={Styles.columnContent}>
                {Entities.IsHero(selectedUnit) && (
                  <Attributes selectedUnit={selectedUnit} />
                )}
              </Panel>
            </Panel>
          </Panel>
          <Panel className={Styles.rightColumn}>
            <Panel className={Styles.columnContent}>
              <Armor selectedUnit={selectedUnit} />
              <MagicResistance selectedUnit={selectedUnit} />
              <Damage selectedUnit={selectedUnit} />
              <MoveSpeed selectedUnit={selectedUnit} />
            </Panel>
          </Panel>
        </Panel>
        <Panel className={Styles.row2}>
          <Level selectedUnit={selectedUnit} />
        </Panel>
      </Panel>
    </Panel>
  );

};

export default React.memo(Character);
