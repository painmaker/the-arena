import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import HeroDescription from "./HeroDescription/HeroDescription";
import Heroes from "./Heroes/Heroes";

const mapStateToProps = (state: RootState) => ({
  hero: state.heroSelectionReducer.hero,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {

};

const HeroSelection = (props: Props) => {

  useEffect(() => {
    const scene = $("#heroSelectionScene") as ScenePanel;
    if (props.hero) {
      scene.LerpToCameraEntity(props.hero.camera, 1.0);
    } else {
      scene.LerpToCameraEntity('camera_main', 1.0);
    }
  }, [props.hero]);

  return (
    <Panel className={"heroSelectionContainer"} >
      <DOTAScenePanel
        id={'heroSelectionScene'}
        className={'heroSelectionBackground'}
        map="heroSelection"
        particleonly={false}
        light={'light'}
        camera={'camera_main'}
      />
      <Heroes />
      <HeroDescription hero={props.hero} />
    </Panel>
  );

}

export default connector(HeroSelection);
