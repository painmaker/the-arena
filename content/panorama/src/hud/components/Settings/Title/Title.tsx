import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setSettingsVisible } from "../../../actions/settingsAction";
import { RootState } from "../../../reducers/rootReducer";
import { SettingsActionTypes } from "../../../types/settingsTypes";
import Styles from "./styles.module.css";

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

const Title = (props: Props) => {

  // $.Msg("REACT-RENDER: Settings - Title rendered");

  const { setSettingsVisible } = props;

  return (
    <Panel className={Styles.container}>
      <Label
        className={Styles.label}
        text={"SETTINGS - " + $.Localize(Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))).toUpperCase()}
      />
      <Button
        className={Styles.closeBtn}
        onactivate={() => {
          setSettingsVisible(false);
          Game.EmitSound("ui_topmenu_select");
        }}
      >
        <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
      </Button>
    </Panel>
  );

};

export default React.memo(connector(Title));

