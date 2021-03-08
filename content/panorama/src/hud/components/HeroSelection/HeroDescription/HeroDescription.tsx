import React, { useEffect, useState } from "react";
import { Timer } from "react-timeout";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { SelectedHero } from "../../../types/heroSelectionTypes";

type Props = ReactTimeoutProps & {
  hero: SelectedHero | undefined
}

const HeroDescription = (props: Props) => {

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    let timer = -1 as Timer;
    if (props.hero === undefined) {
      timer = props.setTimeout(() => {
        setRenderComponent(false);
      }, 1000);
    } else {
      setRenderComponent(true);
    }
    return () => props.clearTimeout(timer);
  }, [props.hero]);

  return (
    <React.Fragment>
      { renderComponent && (
        <Panel
          className={"heroSelectionHeroDescriptionContainer"}
          style={{
            opacity: props.hero ? '1.0' : '0.0',
            preTransformScale2d: props.hero ? '1.0' : '0.5',
          }}
        >
          { props.hero && (
            <React.Fragment>
              <Label text={$.Localize(props.hero.name)} />
              <Label className={'heroSelectionHeroDescriptionLore'} text={props.hero.lore} />
            </React.Fragment>
          )}
        </Panel>
      )}
    </React.Fragment>

  );
}

export default withReactTimeout(HeroDescription);
