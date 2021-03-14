import React from "react";
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

const Name = (props: Props) => {
  return (
    <Panel className={'heroSelectionDescriptionNameContainer'}>
      <Panel
        className={'heroSelectionDescriptionNameAttributeImage'}
        style={{ backgroundImage: attributeToImage(props.focusedHero.attribute) }} />
      <Label
        className={'heroSelectionDescriptionNameLabel'}
        text={$.Localize(props.focusedHero.heroname)}
      />
      <Panel className={'heroSelectionDescriptionHeroIconContainer'}>
        <DOTAHeroImage
          className={'heroSelectionDescriptionHeroIcon'}
          heroname={props.focusedHero.heroname}
          heroimagestyle={'icon'}
        />
      </Panel>
    </Panel>
  );
};

export default Name;
