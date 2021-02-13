import React, { useState } from "react";
import { useGameEvent } from "react-panorama";

const PlayerPanel = () => {

  const [entindex, setEntindex] = useState(Players.GetLocalPlayerPortraitUnit());

  useGameEvent("dota_player_update_query_unit", () => {
    setEntindex(Players.GetLocalPlayerPortraitUnit());
  }, []);

  useGameEvent("dota_player_update_selected_unit", () => {
    setEntindex(Players.GetLocalPlayerPortraitUnit());
  }, []);

  if (!Entities.IsRealHero(entindex)) {
    return null;
  }

  const playerId = Entities.GetPlayerOwnerID(entindex);
  const playerInfo = Game.GetPlayerInfo(playerId);

  return (
    <Panel className={'playerContainer'}>
      <DOTAAvatarImage
        steamid={playerInfo.player_steamid}
        style={{
          width: '64px',
          height: '64px',
        }}
      />
      <Panel className={'playerLabelContainer'}>
        <DOTAUserName className={'playerLabel'} steamid={playerInfo.player_steamid} />
      </Panel>
    </Panel>
  );

};

export default PlayerPanel;
