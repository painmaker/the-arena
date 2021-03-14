import React from "react";
import { FocusedHero } from "../../../../types/heroSelectionTypes";

type Props = {
  focusedHero: FocusedHero,
}

const Attributes = (props: Props) => {
  return (
    <Panel className={'heroSelectionDescriptionAttributesOuterContainer'}>
      <Label className={'heroSelectionDescriptionAttributesTitleLabel'} text={"Attributes"} />
      <Panel className={'heroSelectionDescriptionAttributesInnerContainer'}>
        <Panel className={'heroSelectionDescriptionAttributesLeftColumn'}>
          <Panel className={'heroSelectionDescriptionAttributesColumnEntryContainer'}>
            <Panel className={'heroSelectionDescriptionAttributesColumnEntry'}>
              <Panel className={'heroSelectionDescriptionAttributesIcon heroSelectionDescriptionAttributesIconAgility'} />
            </Panel>
            <Panel className={'heroSelectionDescriptionAttributesColumnEntry'}>
              <Label className={'heroSelectionDescriptionAttributesBaseLabel'} text={props.focusedHero.agility} />
            </Panel>
            <Panel className={'heroSelectionDescriptionAttributesColumnEntry'}>
              <Label className={'heroSelectionDescriptionAttributesGainLabel'} text={'+' + props.focusedHero.agilityGain.toFixed(1)} />
            </Panel>
          </Panel>
          <Panel className={'heroSelectionDescriptionAttributesColumnEntryContainer'}>
            <Panel className={'heroSelectionDescriptionAttributesColumnEntry'}>
              <Panel className={'heroSelectionDescriptionAttributesIcon heroSelectionDescriptionAttributesIconStrength'} />
            </Panel>
            <Panel className={'heroSelectionDescriptionAttributesColumnEntry'}>
              <Label className={'heroSelectionDescriptionAttributesBaseLabel'} text={props.focusedHero.strength} />
            </Panel>
            <Panel className={'heroSelectionDescriptionAttributesColumnEntry'}>
              <Label className={'heroSelectionDescriptionAttributesGainLabel'} text={'+' + props.focusedHero.strengthGain.toFixed(1)} />
            </Panel>
          </Panel>
          <Panel className={'heroSelectionDescriptionAttributesColumnEntryContainer'}>
            <Panel className={'heroSelectionDescriptionAttributesColumnEntry'}>

              <Panel className={'heroSelectionDescriptionAttributesIcon heroSelectionDescriptionAttributesIconIntelligence'} />
            </Panel>
            <Panel className={'heroSelectionDescriptionAttributesColumnEntry'}>
              <Label className={'heroSelectionDescriptionAttributesBaseLabel'} text={props.focusedHero.intelligence} />
            </Panel>
            <Panel className={'heroSelectionDescriptionAttributesColumnEntry'}>
              <Label className={'heroSelectionDescriptionAttributesGainLabel'} text={'+' + props.focusedHero.intelligenceGain.toFixed(1)} />
            </Panel>
          </Panel>
        </Panel>
        <Panel className={'heroSelectionDescriptionAttributesRightColumn'}>
          <Panel className={'heroSelectionDescriptionAttributesColumnEntryContainer'}>
            <Label
              className={'heroSelectionDescriptionAttributesAdditionInformationLabel'}
              text={props.focusedHero.attribute === 'DOTA_ATTRIBUTE_AGILITY' ? '+ 0.5 move speed. + 0.5 attack speed. + 1.0 damage.' : '+ 0.5 move speed. + 0.5 attack speed.'}
            />
          </Panel>
          <Panel className={'heroSelectionDescriptionAttributesColumnEntryContainer'}>
            <Label
              className={'heroSelectionDescriptionAttributesAdditionInformationLabel'}
              text={props.focusedHero.attribute === 'DOTA_ATTRIBUTE_STRENGTH' ? '+ 1.0 health. + 0.5 health regen. + 1.0 damage.' : '+ 1.0 health. + 0.5 health regen.'}
            />
          </Panel>
          <Panel className={'heroSelectionDescriptionAttributesColumnEntryContainer'}>
            <Label
              className={'heroSelectionDescriptionAttributesAdditionInformationLabel'}
              text={props.focusedHero.attribute === 'DOTA_ATTRIBUTE_INTELLECT' ? '+ 1.0 mana. + 0.5 mana regen. + 1.0 damage.' : '+ 1.0 mana. + 0.5 mana regen.'}
            />
          </Panel>
        </Panel>
      </Panel>
    </Panel>
  );
};

export default Attributes;
