import React, { useEffect } from "react";
import { useSelectedUnit } from "../../../hooks/useSelectedUnit";
import Level from "./HeroLevel/HeroLevel";
import Avatar from "./PlayerAvatar/PlayerAvatar";

const ModelPanel = () => {

  $.Msg("REACT-RENDER: Character - HeroModel rendered");

  const selectedUnit = useSelectedUnit();

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

  return (
    <Panel className={'modelPanelContainer'}>
      <Label
        text={$.Localize(Entities.GetUnitName(selectedUnit)).toUpperCase()}
        className={'characterPanelComponentTitleLabel modelPanelHeroNameLabel'}
      />
      <DOTAScenePanel
        id={'modelPanelScene'}
        key={Entities.GetUnitName(selectedUnit)}
        unit={Entities.GetUnitName(selectedUnit)}
        className={'modelPanelHeroScreen'}
        allowrotation={true}
      />
      <Level />
      <Avatar />
    </Panel>
  );

};

export default ModelPanel;
