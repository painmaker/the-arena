import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import Player from "./Player/Player";

type Props = ReactTimeoutProps & {};

const ModelPanel = (props: Props) => {

  const [entindex, setEntindex] = useState(Players.GetLocalPlayerPortraitUnit());

  useGameEvent("dota_player_update_query_unit", () => {
    setEntindex(Players.GetLocalPlayerPortraitUnit());
  }, []);

  useGameEvent("dota_player_update_selected_unit", () => {
    setEntindex(Players.GetLocalPlayerPortraitUnit());
  }, []);

  const unitname = Entities.GetUnitName(entindex);

  return (
    <Panel className={'modelPanelContainer'}>
      <Panel className={'modelPanelBackground'}>
        <Label
          text={unitname}
          className={'characterPanelTitleLabel modelPanelHeroNameLabel'}
        />
        <DOTAScenePanel
          key={unitname}
          hittest={true}
          unit={unitname}
          className={'modelPanelHeroScreen'}
          particleonly={false}
          allowrotation={true}
        />
        <Player />
      </Panel>
    </Panel>
  );

};

export default withReactTimeout(ModelPanel);
