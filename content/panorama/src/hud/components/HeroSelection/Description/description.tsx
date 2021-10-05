import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { resetFocusedHero } from "../../../actions/heroSelectionActions";
import { FocusedHero, HeroSelectionActionTypes } from "../../../types/heroSelectionTypes";
import Buttons from "./Buttons/Buttons";
import Lore from "./Lore/Lore";
import Heroname from "./Heroname/Heroname";
import Stats from "./Stats/Stats";
import Title from "./Title/Title";
import Abilities from "./Abilities/Abilities";
import HealthAndMana from "./HealthAndMana/HealthAndMana";
import Attributes from "./Attributes/Attributes";
import { cancelSchedule } from "../../../utils/Schedule";
import { SCHEDULE_THINK_SLOW } from "../../../App";

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  resetFocusedHero: () => dispatch(resetFocusedHero()),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  focusedHero: FocusedHero | undefined
}

const Description = (props: Props) => {

  const { focusedHero } = props;

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    if (focusedHero === undefined) {
      schedule = $.Schedule(SCHEDULE_THINK_SLOW, () => setRenderComponent(false));
    } else {
      setRenderComponent(true);
    }
    return () => cancelSchedule(schedule, Description.name);
  }, [focusedHero]);

  return (
    <React.Fragment>
      {renderComponent && (
        <Panel
          className={"heroSelectionDescriptionContainer"}
          style={{
            opacity: focusedHero ? '1.0' : '0.0',
            preTransformScale2d: focusedHero ? '1.0' : '0.5',
          }}
        >
          {focusedHero && (
            <React.Fragment>
              <Title />
              <Heroname focusedHero={focusedHero} />
              <Panel style={{ flowChildren: 'right', width: '100%' }}>
                <Attributes focusedHero={focusedHero} />
                <Stats focusedHero={focusedHero} />
              </Panel>
              <Panel style={{ flowChildren: 'right', width: '100%' }}>
                <Abilities focusedHero={focusedHero} />
                <HealthAndMana focusedHero={focusedHero} />
              </Panel>
              <Lore focusedHero={focusedHero} />
              <Buttons focusedHero={focusedHero} />
            </React.Fragment>
          )}
        </Panel>
      )
      }
    </React.Fragment >

  );
}

export default connector(Description);
