import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Timer } from "react-timeout";
import { Dispatch } from "redux";
import { resetFocusedHero } from "../../../actions/heroSelectionActions";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { FocusedHero, HeroSelectionActionTypes } from "../../../types/heroSelectionTypes";
import Buttons from "./Buttons/Buttons";
import Lore from "./Lore/Lore";
import Name from "./Name/Name";
import Stats from "./Stats/Stats";
import Title from "./Title/Title";
import Abilities from "./Abilities/Abilities";
import HealthAndMana from "./HealthAndMana/HealthAndMana";
import Attributes from "./Attributes/Attributes";

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  resetFocusedHero: () => dispatch(resetFocusedHero()),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  focusedHero: FocusedHero | undefined
}

const Description = (props: Props) => {

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    let timer = -1 as Timer;
    if (props.focusedHero === undefined) {
      timer = props.setTimeout(() => {
        setRenderComponent(true);
      }, 1000);
    } else {
      setRenderComponent(true);
    }
    return () => props.clearTimeout(timer);
  }, [props.focusedHero]);

  return (
    <React.Fragment>
      { renderComponent && (
        <Panel
          className={"heroSelectionDescriptionContainer"}
          style={{
            opacity: props.focusedHero ? '1.0' : '0.0',
            preTransformScale2d: props.focusedHero ? '1.0' : '0.5',
          }}
        >
          { props.focusedHero && (
            <React.Fragment>
              <Title />
              <Name focusedHero={props.focusedHero} />
              <Panel style={{ flowChildren: 'right', width: '100%' }}>
                <Attributes focusedHero={props.focusedHero} />
                <Stats focusedHero={props.focusedHero} />
              </Panel>
              <Panel style={{ flowChildren: 'right', width: '100%' }}>
                <Abilities focusedHero={props.focusedHero} />
                <HealthAndMana focusedHero={props.focusedHero} />
              </Panel>
              <Lore focusedHero={props.focusedHero} />
              <Buttons focusedHero={props.focusedHero} />
            </React.Fragment>
          )}
        </Panel>
      )
      }
    </React.Fragment >

  );
}

export default connector(withReactTimeout(Description));
