import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setSettingsVisible } from "../../../../actions/settingsAction";
import { RootState } from "../../../../reducers/rootReducer";
import { SettingsActionTypes } from "../../../../types/settingsTypes";

const mapStateToProps = (state: RootState) => ({
  visible: state.settingsReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionTypes>) => ({
  setSettingsVisible: (visible: boolean) => dispatch(setSettingsVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const CloseBtn = (props: Props) => {

  return (
    <Panel className={'settingsCloseBtnContainer'}>
      <Button
        className="settingsCloseBtn"
        onactivate={() => {
          props.setSettingsVisible(!props.visible);
          Game.EmitSound("ui_topmenu_select");
        }}
      >
        <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
      </Button>
    </Panel>
  );

};

export default connector(CloseBtn);