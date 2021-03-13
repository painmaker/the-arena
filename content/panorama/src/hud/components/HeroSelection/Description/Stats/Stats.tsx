import React from "react";
import { FocusedHero } from "../../../../types/heroSelectionTypes";

type Props = {
  focusedHero: FocusedHero,
}

const Stats = (props: Props) => {

  return (
    <Panel className={'heroSelectionDescriptionStatsContainer'}>
      {/* <Panel style={{ flowChildren: 'right' }}>
        <Panel
          className={'heroSelectionDescriptionStatsHeroAttribute'}
          style={{ backgroundImage: attributeToImage(props.focusedHero.attribute) }} />
        <Label
          className={'heroSelectionDescriptionStatsHeroLabel'}
          text={$.Localize(props.focusedHero.name)}
        />
      </Panel> */}
    </Panel>
  );

};

export default Stats;
