import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setSettingsVisible } from "../../../actions/settingsAction";
import { RootState } from "../../../reducers/rootReducer";
import { SettingsActionTypes } from "../../../types/settingsTypes";

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

const SettingsButton = (props: Props) => {
  return (
    <Panel hittest={false}>
      <Button>
        <Image
          style={{ washColor: props.visible ? 'orange' : 'white' }}
          onactivate={() => {
            props.setSettingsVisible(!props.visible);
            Game.EmitSound("ui_topmenu_select");
          }}
          src="s2r://panorama/images/settings_btn_white_png.vtex"
        />
      </Button>
    </Panel>
  );
};

export default connector(SettingsButton);
