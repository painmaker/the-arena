import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import Level from "./Level/Level";
import Avatar from "./Avatar/Avatar";

const ModelPanel = () => {

  const [entindex, setEntindex] = useState(Players.GetLocalPlayerPortraitUnit());

  useGameEvent("dota_player_update_query_unit", () => {
    setEntindex(Players.GetLocalPlayerPortraitUnit());
  }, []);

  useGameEvent("dota_player_update_selected_unit", () => {
    setEntindex(Players.GetLocalPlayerPortraitUnit());
  }, []);

  useEffect(() => {
    const scenePanel = $('#modelPanelScene') as ScenePanel;
    if (Entities.IsRealHero(entindex)) {
      for (let i = 0; i < Entities.GetNumBuffs(entindex); i++) {
        const buff = Entities.GetBuff(entindex, i);
        if (Buffs.GetName(entindex, buff) === 'modifier_ui_hero_id') {
          const heroId = Buffs.GetStackCount(entindex, buff) as HeroID;
          scenePanel.SetScenePanelToLocalHero(heroId);
        }
      }
    } else {
      scenePanel.SetUnit(Entities.GetUnitName(entindex), "", true);
    }
    scenePanel.SetPostProcessFade(100);
  }, [entindex])

  return (
    <Panel className={'modelPanelContainer'}>
      <Label
        text={$.Localize(Entities.GetUnitName(entindex)).toUpperCase()}
        className={'characterPanelComponentTitleLabel modelPanelHeroNameLabel'}
      />
      <DOTAScenePanel
        id={'modelPanelScene'}
        key={Entities.GetUnitName(entindex)}
        className={'modelPanelHeroScreen'}
        allowrotation={true}
      />
      <Avatar />
      <Level />
    </Panel>
  );

};

export default ModelPanel;
