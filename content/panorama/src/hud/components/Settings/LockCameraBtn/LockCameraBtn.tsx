import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setCameraLocked } from "../../../actions/settingsAction";
import { RootState } from "../../../reducers/rootReducer";
import { SettingsActionTypes } from "../../../types/settingsTypes";
import { Styles } from "./Styles";

const mapStateToProps = (state: RootState) => ({
  locked: state.settingsReducer.cameraLocked,
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionTypes>) => ({
  setCameraLocked: (locked: boolean) => dispatch(setCameraLocked(locked)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const LockCameraBtn = (props: Props) => {

  // $.Msg("REACT-RENDER: Settings - LockCameraBtn rendered");

  return (
    <Panel style={Styles.Container()}>
      <Label
        style={Styles.LeftLabel()}
        text={"Lock Camera:"}
      />
      <Panel style={Styles.ToggleBtnContainer()}>
        <ToggleButton
          selected={props.locked}
          onactivate={() => props.setCameraLocked(!props.locked)}
        />
      </Panel>
      <Label
        style={Styles.RightLabel()}
        text={props.locked ? "Locked" : "Unlocked"}
      />
    </Panel>

  );
}

export default connector(LockCameraBtn);