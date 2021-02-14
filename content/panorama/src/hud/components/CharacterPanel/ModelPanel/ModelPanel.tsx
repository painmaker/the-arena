import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import Level from "./Level/Level";
import Player from "./Player/Player";

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
      <Panel className={'modelPanelBackground'}>
        <Label
          text={$.Localize(Entities.GetUnitName(entindex))}
          className={'characterPanelComponentTitleLabel modelPanelHeroNameLabel'}
        />
        <DOTAScenePanel
          id={'modelPanelScene'}
          key={Entities.GetUnitName(entindex)}
          hittest={true}
          className={'modelPanelHeroScreen'}
          particleonly={false}
          allowrotation={true}
        />
        <Player />
        <Level />
      </Panel>
    </Panel>
  );

};

export default ModelPanel;
