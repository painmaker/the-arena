import React from 'react'
import { useNetTableValues } from 'react-panorama';
import Styles from './RemainingPlayers.module.css';

const avatar: Partial<VCSSStyleDeclaration> = {
  width: '20px',
  height: '20px',
  border: '1px solid rgba(0, 0, 0, 0.5)',
  borderRadius: '5px',
  verticalAlign: 'center',
  horizontalAlign: 'left',
  marginLeft: '5px',
  marginRight: '5px',
}

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
    <Panel className={Styles.container}>
      <Label className={Styles.label} text={'Players Remaining'} />
      <Panel className={Styles.imagesContainer} >
        {unpickedPlayerIDs.map(id => (
          <DOTAAvatarImage
            key={id}
            steamid={Game.GetPlayerInfo(id).player_steamid}
            style={avatar}
          />
        ))}
      </Panel>
    </Panel>
  );

}

export default RemainingPlayers;