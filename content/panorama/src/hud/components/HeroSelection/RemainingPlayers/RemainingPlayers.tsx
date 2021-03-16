import React from 'react'
import { useNetTableValues } from 'react-panorama';

const RemainingPlayers = () => {

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;

  const allPlayerIDs: PlayerID[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const unpickedPlayerIDs = allPlayerIDs
    .filter(id => !Object.values(heroes).some(hero => hero.playerID === id))
    .filter(id => Players.IsValidPlayerID(id));

  if (unpickedPlayerIDs.length === 0) {
    return null;
  }

  return (
    <Panel className={'remainingPlayersContainer'}>
      <Label className={'remainingPlayersLabel'} text={'Remaining Players:'} />
      <Panel className={'remainingPlayersImageContainer'}>
        {unpickedPlayerIDs.map(id => {
          const steamID = Game.GetPlayerInfo(id).player_steamid;
          return (
            <DOTAAvatarImage
              key={id}
              steamid={steamID}
              style={{
                width: '24px',
                height: '24px',
                border: '1px solid rgba(0, 0, 0, 0.5)',
                borderRadius: '5px',
                verticalAlign: 'center',
                horizontalAlign: 'right',
              }}
            />
          );
        })}
      </Panel>

    </Panel>
  );

}

export default RemainingPlayers;