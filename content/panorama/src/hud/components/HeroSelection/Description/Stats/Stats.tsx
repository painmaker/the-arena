import React from "react";
import { FocusedHero } from "../../../../interfaces/heroSelectionTypes";
import Styles from './styles.module.css'

type Props = {
  focusedHero: FocusedHero,
}

const Stats = (props: Props) => {
  return (
    <Panel className={Styles.outerContainer}>
      <Label className={Styles.title} text={"Stats"} />
      <Panel className={Styles.innerContainer}>
        <Panel className={Styles.column}>
          <Panel className={Styles.columnEntryOuterContainer}>
            <Panel className={Styles.columnEntryInnerContainer}>
              <Panel className={`${Styles.image} ${Styles.damageImage}`} />
              <Label className={Styles.columnEntryLabel} text={props.focusedHero.damage} />
            </Panel>
          </Panel>
          <Panel className={Styles.columnEntryOuterContainer}>
            <Panel className={Styles.columnEntryInnerContainer}>
              <Panel className={`${Styles.image} ${Styles.armorImage}`} />
              <Label className={Styles.columnEntryLabel} text={props.focusedHero.armor} />
            </Panel>
          </Panel>
          <Panel className={Styles.columnEntryOuterContainer}>
            <Panel className={Styles.columnEntryInnerContainer}>
              <Panel className={`${Styles.image} ${Styles.moveSpeedImage}`} />
              <Label className={Styles.columnEntryLabel} text={props.focusedHero.movespeed.toFixed(0)} />
            </Panel>
          </Panel>
        </Panel>
        <Panel className={Styles.column}>
          <Panel className={Styles.columnEntryOuterContainer}>
            <Panel className={Styles.columnEntryInnerContainer}>
              <Panel className={`${Styles.image} ${Styles.attackRateImage}`} />
              <Label className={Styles.columnEntryLabel} text={props.focusedHero.attackRate.toFixed(1)} />
            </Panel>
          </Panel>
          <Panel className={Styles.columnEntryOuterContainer}>
            <Panel className={Styles.columnEntryInnerContainer}>
              <Panel className={`${Styles.image} ${Styles.attackSpeedImage}`} />
              <Label className={Styles.columnEntryLabel} text={props.focusedHero.attackSpeed.toFixed(0)} />
            </Panel>
          </Panel>
          <Panel className={Styles.columnEntryOuterContainer}>
            <Panel className={Styles.columnEntryInnerContainer}>
              <Panel className={`${Styles.image} ${Styles.attackRangeImage}`} />
              <Label className={Styles.columnEntryLabel} text={props.focusedHero.attackRange.toFixed(0)} />
            </Panel>
          </Panel>
        </Panel>
      </Panel>
    </Panel>
  );
};

export default Stats;
