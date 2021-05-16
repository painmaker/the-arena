import React from 'react'
import { useNetTableValues } from 'react-panorama';

const wrapper: Partial<VCSSStyleDeclaration> = {
  verticalAlign: 'bottom',
  horizontalAlign: 'left',
  marginBottom: '173px',
  marginLeft: '205px',
  flowChildren: 'down',
}

const label: Partial<VCSSStyleDeclaration> = {
  fontSize: '14px',
  color: 'rgb(200, 200, 200)',
  verticalAlign: 'center',
  horizontalAlign: 'center',
  textShadow: '1px 1px 2px 2 #000000',
  letterSpacing: '0.9px',
  marginBottom: '-10px',
  zIndex: 10,
}

const imagesContainer: Partial<VCSSStyleDeclaration> = {
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  minWidth: '150px',
  height: '39px',
  flowChildren: 'right',
  paddingTop: '5px',
  paddingLeft: '5px',
  paddingRight: '5px',
}

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
    <Panel style={wrapper}>
      <Label style={label} text={'Players Remaining'} />
      <Panel style={imagesContainer} >
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