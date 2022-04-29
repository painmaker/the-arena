import React, { useEffect } from "react";
import { Styles } from "./Styles";

type Props = {
  selectedUnit: EntityIndex,
}

const Model = (props: Props) => {

  // $.Msg("REACT-RENDER: Character - HeroModel rendered");

  const { selectedUnit } = props;

  useEffect(() => {
    const scenePanel = $('#modelPanelScene') as ScenePanel;
    if (Entities.IsHero(selectedUnit)) {
      const heroID = Game.GetPlayerInfo(Entities.GetPlayerOwnerID(selectedUnit)).player_selected_hero_id;
      scenePanel.SetScenePanelToLocalHero(heroID);
    } else {
      scenePanel.SetUnit(Entities.GetUnitName(selectedUnit), "", true);
    }
    scenePanel.SetPostProcessFade(100);
  }, [selectedUnit])

  return (
    <Panel style={Styles.Container()}>
      <Label
        style={Styles.Label()}
        text={$.Localize("#" + Entities.GetUnitName(selectedUnit)).toUpperCase()}
      />
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
