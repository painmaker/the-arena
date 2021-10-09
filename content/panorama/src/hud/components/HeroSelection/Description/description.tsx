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
import { HUD_THINK_SLOW } from "../../../App";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  resetFocusedHero: () => dispatch(resetFocusedHero()),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  focusedHero: FocusedHero | undefined
}

const Description = (props: Props) => {

  const { focusedHero, setTimeout, clearTimeout } = props;

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    let id: ReactTimeout.Timer | undefined = undefined;
    if (focusedHero === undefined) {
      const update = () => setRenderComponent(false);
      id = setTimeout!(update, HUD_THINK_SLOW);
    } else {
      setRenderComponent(true);
    }
    return () => {
      if (id) {
        clearTimeout!(id)
      }
    }
  }, [focusedHero, setTimeout, clearTimeout]);

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

export default React.memo(connector(ReactTimeout(Description)));
