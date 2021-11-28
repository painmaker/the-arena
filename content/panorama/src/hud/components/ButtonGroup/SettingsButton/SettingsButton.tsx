import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setSettingsVisible } from "../../../actions/settingsAction";
import { RootState } from "../../../reducers/rootReducer";
import { SettingsActionTypes } from "../../../types/settingsTypes";
import ParentStyles from './../styles.module.css';

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

  // $.Msg("REACT-RENDER: ButtonGroup - SettingsButton rendered");

  const { visible, setSettingsVisible } = props;

  return (
    <Button
      className={ParentStyles.btn}
      onactivate={() => {
        setSettingsVisible(!visible);
        Game.EmitSound("ui_topmenu_select");
      }}
    >
      <Image
        style={{ washColor: visible ? 'orange' : 'white' }}
        src="s2r://panorama/images/settings_btn_white_png.vtex"
      />
    </Button>
  );

};

export default React.memo(connector(SettingsButton));
