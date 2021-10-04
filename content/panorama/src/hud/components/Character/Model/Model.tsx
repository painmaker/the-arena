import React, { useEffect } from "react";
import { Styles } from "./Styles";

interface Props {
  selectedUnit: EntityIndex,
}

const Model = (props: Props) => {

  $.Msg("REACT-RENDER: Character - HeroModel rendered");

  const { selectedUnit } = props;

  useEffect(() => {
    const scenePanel = $('#modelPanelScene') as ScenePanel;
    if (Entities.IsRealHero(selectedUnit)) {
      for (let i = 0; i < Entities.GetNumBuffs(selectedUnit); i++) {
        const buff = Entities.GetBuff(selectedUnit, i);
        if (Buffs.GetName(selectedUnit, buff) === 'modifier_ui_hero_id') {
          const heroId = Buffs.GetStackCount(selectedUnit, buff) as HeroID;
          scenePanel.SetScenePanelToLocalHero(heroId);
          scenePanel.SetCustomPostProcessMaterial("materials/dev/deferred_post_process_graphic_ui.vmat")
        }
      }
    } else {
      scenePanel.SetUnit(Entities.GetUnitName(selectedUnit), "", true);
    }
    scenePanel.SetPostProcessFade(100);
  }, [selectedUnit])

  const name = $.Localize(Entities.GetUnitName(selectedUnit)).toUpperCase();

  return (
    <Panel style={Styles.Container()}>
      <Label text={name} style={Styles.Label()} />
      <DOTAScenePanel
        id={'modelPanelScene'}
        key={Entities.GetUnitName(selectedUnit)}
        unit={Entities.GetUnitName(selectedUnit)}
        style={Styles.Screen()}
        allowrotation={true}
      />
    </Panel>
  );

};

export default React.memo(Model);
