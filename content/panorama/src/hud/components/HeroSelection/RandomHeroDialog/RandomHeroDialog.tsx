import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setRandomHeroDialogVisible } from "../../../actions/heroSelectionActions";
import { HUD_THINK_SLOW } from "../../../App";
import { RootState } from "../../../reducers/rootReducer";
import { HeroSelectionActionTypes } from "../../../types/heroSelectionTypes";
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

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

  const { randomHeroDialogVisible, setRandomHeroDialogVisible, setTimeout, clearTimeout } = props;

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    let id: ReactTimeout.Timer | undefined = undefined;
    if (randomHeroDialogVisible === false) {
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
  }, [randomHeroDialogVisible, setTimeout, clearTimeout]);

  return (
    <React.Fragment>
      {renderComponent && (
        <Panel
          className={'heroSelectionRandomHeroDialogOuterContainer'}
          style={{
            opacity: randomHeroDialogVisible ? '1.0' : '0.0',
            preTransformScale2d: randomHeroDialogVisible ? '1.0' : '0.5',
          }}
        >
          <Panel className={'heroSelectionRandomHeroDialogInnerContainer'}>
            <Panel className={'heroSelectionRandomHeroDialogCenterContainer'}>
              <Label className={'heroSelectionRandomHeroDialogLabel'} text={'Select Random Hero?'} />
            </Panel>
            <Panel className={'heroSelectionRandomHeroDialogButtonContainer'}>
              <Button
                className={'heroSelectionRandomHeroDialogButton'}
                onactivate={() => {
                  GameEvents.SendCustomGameEventToServer("on_random_hero", {});
                  setRandomHeroDialogVisible(false);
                  Game.EmitSound("ui_topmenu_select");
                }}
              >
                <Label className={'heroSelectionRandomHeroDialogButtonLabel'} text={'YES'} />
              </Button>
              <Button
                className={'heroSelectionRandomHeroDialogButton'}
                onactivate={() => {
                  setRandomHeroDialogVisible(false);
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

export default connector(ReactTimeout(RandomHeroDialog));
