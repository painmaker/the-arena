import React from "react";
import { FocusedHero } from "../../../../types/heroSelectionTypes";
import Styles from './styles.module.css';

type Props = {
  focusedHero: FocusedHero,
}

const Attributes = (props: Props) => {
  return (
    <Panel className={Styles.outerContainer}>
      <Label className={Styles.titleLabel} text={"Attributes"} />
      <Panel className={Styles.innerContainer}>
        <Panel className={Styles.leftColumn}>
          <Panel className={Styles.columnEntryContainer}>
            <Panel className={Styles.columnEntry}>
              <Panel className={`${Styles.icon} ${Styles.iconAgility}`} />
            </Panel>
            <Panel className={Styles.columnEntry}>
              <Label className={Styles.baseLabel} text={props.focusedHero.agility} />
            </Panel>
            <Panel className={Styles.columnEntry}>
              <Label className={Styles.gainLabel} text={'+' + props.focusedHero.agilityGain.toFixed(1)} />
            </Panel>
          </Panel>
          <Panel className={Styles.columnEntryContainer}>
            <Panel className={Styles.columnEntry}>
              <Panel className={`${Styles.icon} ${Styles.iconStrength}`} />
            </Panel>
            <Panel className={Styles.columnEntry}>
              <Label className={Styles.baseLabel} text={props.focusedHero.strength} />
            </Panel>
            <Panel className={Styles.columnEntry}>
              <Label className={Styles.gainLabel} text={'+' + props.focusedHero.strengthGain.toFixed(1)} />
            </Panel>
          </Panel>
          <Panel className={Styles.columnEntryContainer}>
            <Panel className={Styles.columnEntry}>

              <Panel className={`${Styles.icon} ${Styles.iconIntelligence}`} />
            </Panel>
            <Panel className={Styles.columnEntry}>
              <Label className={Styles.baseLabel} text={props.focusedHero.intelligence} />
            </Panel>
            <Panel className={Styles.columnEntry}>
              <Label className={Styles.gainLabel} text={'+' + props.focusedHero.intelligenceGain.toFixed(1)} />
            </Panel>
          </Panel>
        </Panel>
        <Panel className={Styles.rightColumn}>
          <Panel className={Styles.columnEntryContainer}>
            <Label
              className={Styles.informationLabel}
              text={props.focusedHero.attribute === 'DOTA_ATTRIBUTE_AGILITY' ? '+ 0.5 move speed. + 0.5 attack speed. + 1.0 damage.' : '+ 0.5 move speed. + 0.5 attack speed.'}
            />
          </Panel>
          <Panel className={Styles.columnEntryContainer}>
            <Label
              className={Styles.informationLabel}
              text={props.focusedHero.attribute === 'DOTA_ATTRIBUTE_STRENGTH' ? '+ 1.0 health. + 0.5 health regen. + 1.0 damage.' : '+ 1.0 health. + 0.5 health regen.'}
            />
          </Panel>
          <Panel className={Styles.columnEntryContainer}>
            <Label
              className={Styles.informationLabel}
              text={props.focusedHero.attribute === 'DOTA_ATTRIBUTE_INTELLECT' ? '+ 1.0 mana. + 0.5 mana regen. + 1.0 damage.' : '+ 1.0 mana. + 0.5 mana regen.'}
            />
          </Panel>
        </Panel>
      </Panel>
    </Panel>
  );
};

export default Attributes;
