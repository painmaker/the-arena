import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Timer } from "react-timeout";
import { Dispatch } from "redux";
import { setRandomHeroDialogVisible } from "../../../actions/heroSelectionActions";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { RootState } from "../../../reducers/rootReducer";
import { HeroSelectionActionTypes } from "../../../types/heroSelectionTypes";

const mapStateToProps = (state: RootState) => ({
  randomHeroDialogVisible: state.heroSelectionReducer.randomHeroDialogVisible
});

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  setRandomHeroDialogVisible: (visible: boolean) => dispatch(setRandomHeroDialogVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
};

const RandomHeroDialog = (props: Props) => {

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    let timer = -1 as Timer;
    if (props.randomHeroDialogVisible === false) {
      timer = props.setTimeout(() => {
        setRenderComponent(false);
      }, 1000);
    } else {
      setRenderComponent(true);
    }
    return () => props.clearTimeout(timer);
  }, [props.randomHeroDialogVisible]);

  return (
    <React.Fragment>
      { renderComponent && (
        <Panel
          className={'heroSelectionRandomHeroDialogOuterContainer'}
          style={{
            opacity: props.randomHeroDialogVisible ? '1.0' : '0.0',
            preTransformScale2d: props.randomHeroDialogVisible ? '1.0' : '0.5',
          }}
        >
          <Panel className={'heroSelectionRandomHeroDialogInnerContainer'}>
            <Panel className={'heroSelectionRandomHeroDialogCenterContainer'}>
              <Label className={'heroSelectionRandomHeroDialogLabel'} text={'Random Hero?'} />
            </Panel>
            <Panel className={'heroSelectionRandomHeroDialogButtonContainer'}>
              <Button
                className={'heroSelectionRandomHeroDialogButton'}
                onactivate={() => {
                  GameEvents.SendCustomGameEventToServer("on_random_hero", {});
                  props.setRandomHeroDialogVisible(false);
                  Game.EmitSound("ui_topmenu_select");
                }}
              >
                <Label className={'heroSelectionRandomHeroDialogButtonLabel'} text={'YES'} />
              </Button>
              <Button
                className={'heroSelectionRandomHeroDialogButton'}
                onactivate={() => {
                  props.setRandomHeroDialogVisible(false);
                  Game.EmitSound("ui_topmenu_select");
                }}
              >
                <Label className={'heroSelectionRandomHeroDialogButtonLabel'} text={'NO'} />
              </Button>
            </Panel>
          </Panel>
          <Panel className={'heroSelectionRandomHeroDialogArrow'} />
        </Panel>
      )}
    </React.Fragment>
  );

}

export default connector(withReactTimeout(RandomHeroDialog));
