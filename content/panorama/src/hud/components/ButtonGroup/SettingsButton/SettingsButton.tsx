import React, { Dispatch, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setSettingsVisible } from "../../../actions/settingsAction";
import { RootState } from "../../../reducers/rootReducer";
import { SettingsActionTypes } from "../../../types/settingsTypes";
import { Styles } from "../Styles";

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

  $.Msg("REACT-RENDER: ButtonGroup - SettingsButton rendered");

  const { visible, setSettingsVisible } = props;

  const [isHovering, setIsHovering] = useState(false);

  return (
    <Button>
      <Image
        style={Styles.EntryHover(visible, isHovering)}
        onmouseover={() => setIsHovering(true)}
        onmouseout={() => setIsHovering(false)}
        onactivate={() => {
          setSettingsVisible(!visible);
          Game.EmitSound("ui_topmenu_select");
        }}
        src="s2r://panorama/images/settings_btn_white_png.vtex"
      />
    </Button>
  );

};

export default connector(SettingsButton);
