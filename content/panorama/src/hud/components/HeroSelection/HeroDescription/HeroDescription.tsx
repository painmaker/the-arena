import React, { useEffect, useState } from "react";
import { useNetTableValues } from "react-panorama";
import { Timer } from "react-timeout";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { FocusedHero } from "../../../types/heroSelectionTypes";

type Props = ReactTimeoutProps & {
  hero: FocusedHero | undefined
}

const HeroDescription = (props: Props) => {

  const [renderComponent, setRenderComponent] = useState(false);
  const selectedHeroes = useNetTableValues('SelectedHero');

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

  const isSelected = Object.values(selectedHeroes).some(hero => props.hero && props.hero.name === hero.heroname);

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
              { !isSelected && (
                <Button
                  className={'heroSelectionHeroDescriptionSelectHeroBtn'}
                  onactivate={() => {
                    GameEvents.SendCustomGameEventToServer("on_select_hero", { heroname: props.hero!.name });
                  }}
                >
                  <Label text={'Select Hero'} />
                </Button>
              )}
            </React.Fragment>
          )}
        </Panel>
      )
      }
    </React.Fragment >

  );
}

export default withReactTimeout(HeroDescription);
