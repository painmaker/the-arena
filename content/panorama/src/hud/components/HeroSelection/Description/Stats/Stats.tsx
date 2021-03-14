import React from "react";
import { FocusedHero } from "../../../../types/heroSelectionTypes";

type Props = {
  focusedHero: FocusedHero,
}

const Stats = (props: Props) => {
  return (
    <Panel className={'heroSelectionDescriptionStatsOuterContainer'}>
      <Label className={'heroSelectionDescriptionStatsTitleLabel'} text={"Stats"} />
      <Panel className={'heroSelectionDescriptionStatsInnerContainer'}>
        <Panel className={'heroSelectionDescriptionStatsColumn'}>
          <Panel className={'heroSelectionDescriptionStatsColumnEntry'} style={{ marginTop: '1px' }}>
            <Panel style={{ flowChildren: 'right', horizontalAlign: 'center' }}>
              <Panel className={'heroSelectionDescriptionStatsImage heroSelectionDescriptionStatsDamageImage'} />
              <Label className={'heroSelectionDescriptionStatsLabel'} text={props.focusedHero.damage} />
            </Panel>
          </Panel>
          <Panel className={'heroSelectionDescriptionStatsColumnEntry'}>
            <Panel style={{ flowChildren: 'right', horizontalAlign: 'center' }}>
              <Panel className={'heroSelectionDescriptionStatsImage heroSelectionDescriptionStatsArmorImage'} />
              <Label className={'heroSelectionDescriptionStatsLabel '} text={props.focusedHero.armor} />
            </Panel>
          </Panel>
          <Panel className={'heroSelectionDescriptionStatsColumnEntry'}>
            <Panel style={{ flowChildren: 'right', horizontalAlign: 'center' }}>
              <Panel className={'heroSelectionDescriptionStatsImage heroSelectionDescriptionStatsMoveSpeedImage'} />
              <Label className={'heroSelectionDescriptionStatsLabel'} text={props.focusedHero.movespeed.toFixed(0)} />
            </Panel>
          </Panel>
        </Panel>
        <Panel className={'heroSelectionDescriptionStatsColumn'}>
          <Panel className={'heroSelectionDescriptionStatsColumnEntry'} style={{ marginTop: '0px' }}>
            <Panel style={{ flowChildren: 'right', horizontalAlign: 'center' }}>
              <Panel className={'heroSelectionDescriptionStatsImage heroSelectionDescriptionStatsAttackRateImage'} />
              <Label className={'heroSelectionDescriptionStatsLabel'} text={props.focusedHero.attackRate.toFixed(1)} />
            </Panel>
          </Panel>
          <Panel className={'heroSelectionDescriptionStatsColumnEntry'}>
            <Panel style={{ flowChildren: 'right', horizontalAlign: 'center' }}>
              <Panel className={'heroSelectionDescriptionStatsImage heroSelectionDescriptionStatsAttackSpeedImage'} />
              <Label className={'heroSelectionDescriptionStatsLabel'} text={props.focusedHero.attackSpeed.toFixed(0)} />
            </Panel>
          </Panel>
          <Panel className={'heroSelectionDescriptionStatsColumnEntry'}>
            <Panel style={{ flowChildren: 'right', horizontalAlign: 'center' }}>
              <Panel className={'heroSelectionDescriptionStatsImage heroSelectionDescriptionStatsAttackRangeImage'} />
              <Label className={'heroSelectionDescriptionStatsLabel'} text={props.focusedHero.attackRange.toFixed(0)} />
            </Panel>
          </Panel>
        </Panel>
      </Panel>
    </Panel>
  );
};

export default Stats;
