import React from "react";
import { useNetTableValues } from "react-panorama";
import { FocusedHero } from "../../../../types/heroSelectionTypes";

const attributeToImage = (attribute: string) => {
  if (attribute === 'DOTA_ATTRIBUTE_AGILITY') {
    return 'url("s2r://panorama/images/primary_attribute_icons/primary_attribute_icon_agility_psd.vtex")'
  }
  if (attribute === 'DOTA_ATTRIBUTE_INTELLECT') {
    return 'url("s2r://panorama/images/primary_attribute_icons/primary_attribute_icon_intelligence_psd.vtex")'
  }
  if (attribute === 'DOTA_ATTRIBUTE_STRENGTH') {
    return 'url("s2r://panorama/images/primary_attribute_icons/primary_attribute_icon_strength_psd.vtex")'
  }
  return '';
}

type Props = {
  focusedHero: FocusedHero,
}

const Heroname = (props: Props) => {

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;

  const steamIds = Object.values(heroes)
    .filter(hero => hero.heroname === props.focusedHero.heroname)
    .filter(hero => hero.picked === 1)
    .map(hero => Game.GetPlayerInfo(hero.playerID).player_steamid);

  return (
    <Panel className={'heroSelectionDescriptionNameContainer'}>
      <Panel
        className={'heroSelectionDescriptionNameAttributeImage'}
        style={{ backgroundImage: attributeToImage(props.focusedHero.attribute) }} />
      <Label
        className={'heroSelectionDescriptionNameLabel'}
        text={$.Localize(props.focusedHero.heroname)}
      />
      {steamIds.length > 0 && (
        <Panel className={'heroSelectionDescriptionPlayerContainer'}>
          <Label text={'Selected by: '} style={{ verticalAlign: 'center' }} />
          <Panel style={{ flowChildren: 'right', marginLeft: '5px', height: '100%' }}>
            {steamIds.map(steamid => (
              <DOTAAvatarImage
                key={steamid}
                steamid={steamid}
                style={{
                  width: '24px',
                  height: '24px',
                  border: '1px solid rgba(0, 0, 0, 0.5)',
                  borderRadius: '5px',
                  verticalAlign: 'center',
                  horizontalAlign: 'right',
                }}
              />
            ))}
          </Panel>
        </Panel>
      )}
    </Panel>
  );

};

export default Heroname;
