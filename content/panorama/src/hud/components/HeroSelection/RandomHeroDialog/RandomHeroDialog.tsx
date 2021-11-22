import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setRandomHeroDialogVisible } from "../../../actions/heroSelectionActions";
import { HUD_THINK_SLOW } from "../../../App";
import { useTimeout } from "../../../hooks/useTimeout";
import { RootState } from "../../../reducers/rootReducer";
import { HeroSelectionActionTypes } from "../../../types/heroSelectionTypes";
import Styles from './randomHeroDialog.module.css';

const mapStateToProps = (state: RootState) => ({
  randomHeroDialogVisible: state.heroSelectionReducer.randomHeroDialogVisible
});

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  setRandomHeroDialogVisible: (visible: boolean) => dispatch(setRandomHeroDialogVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const RandomHeroDialog = (props: Props) => {

  const { randomHeroDialogVisible, setRandomHeroDialogVisible } = props;

  const [renderComponent, setRenderComponent] = useState(false);

  useTimeout(() => {
    setRenderComponent(randomHeroDialogVisible)
  }, randomHeroDialogVisible === false ? HUD_THINK_SLOW : 0)

  return (
    <React.Fragment>
      {renderComponent && (
        <Panel
          className={Styles.outerContainer}
          style={{
            opacity: randomHeroDialogVisible ? '1.0' : '0.0',
            preTransformScale2d: randomHeroDialogVisible ? '1.0' : '0.5',
          }}
        >
          <Panel className={Styles.innerContainer}>
            <Panel className={Styles.centerContainer}>
              <Label className={Styles.label} text={'Select Random Hero?'} />
            </Panel>
            <Panel className={Styles.buttonContainer}>
              <Button
                className={Styles.button}
                onactivate={() => {
                  GameEvents.SendCustomGameEventToServer("on_random_hero", {});
                  setRandomHeroDialogVisible(false);
                  Game.EmitSound("ui_topmenu_select");
                }}
              >
                <Label className={Styles.buttonLabel} text={'YES'} />
              </Button>
              <Button
                className={Styles.button}
                onactivate={() => {
                  setRandomHeroDialogVisible(false);
                  Game.EmitSound("ui_topmenu_select");
                }}
              >
                <Label className={Styles.buttonLabel} text={'NO'} />
              </Button>
            </Panel>
          </Panel>
          <Panel className={Styles.arrow} />
        </Panel>
      )}
    </React.Fragment>
  );

}

export default connector(RandomHeroDialog);
