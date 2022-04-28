import React from "react";
import { useNetTableValues } from "react-panorama";
import { FocusedHero } from "../../../../interfaces/heroSelectionTypes";
import Styles from './styles.module.css';

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

const avatar: Partial<VCSSStyleDeclaration> = {
  width: '24px',
  height: '24px',
  border: '1px solid rgba(0, 0, 0, 0.5)',
  borderRadius: '5px',
  verticalAlign: 'center',
  horizontalAlign: 'right',
};

const Heroname = (props: Props) => {

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;

  const steamIds = Object.values(heroes)
    .filter(hero => hero.heroname === props.focusedHero.heroname)
    .filter(hero => hero.picked === 1)
    .map(hero => Game.GetPlayerInfo(hero.playerID).player_steamid);

  return (
    <Panel className={Styles.container}>
      <Panel
        className={Styles.attributeImage}
        style={{ backgroundImage: attributeToImage(props.focusedHero.attribute) }}
      />
      <Label
        className={Styles.heronameLabel}
        text={$.Localize(props.focusedHero.heroname)}
      />
      {steamIds.length > 0 && (
        <Panel className={Styles.avatarOuterContainer}>
          <Label
            className={Styles.selectedByLabel}
            text={'Selected by: '}
          />
          <Panel className={Styles.avatarInnerContainer}>
            {steamIds.map(steamid => (
              <DOTAAvatarImage
                key={steamid}
                steamid={steamid}
                style={avatar}
              />
            ))}
          </Panel>
        </Panel>
      )}
    </Panel>
  );

};

export default Heroname;
