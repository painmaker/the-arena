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
  if (!Players.IsValidPlayerID(playerId)) {
    return null;
  }

  const steamid = Game.GetPlayerInfo(playerId).player_steamid;

  return (
    <Panel className={'playerContainer'}>
      <DOTAAvatarImage steamid={steamid} style={{ width: '64px', height: '64px' }} />
      <Panel className={'playerLabelContainer'}>
        <DOTAUserName className={'playerLabel'} steamid={steamid} />
      </Panel>
    </Panel>
  );

};

export default PlayerPanel;
