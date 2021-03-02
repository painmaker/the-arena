import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setCameraLocked } from "../../../actions/settingsAction";
import { RootState } from "../../../reducers/rootReducer";
import { SettingsActionTypes } from "../../../types/settingsTypes";

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
  return (
    <Panel className={'settingsItem settingsLockCameraBtnContainer'}>
      <Label className={'lockCameraBtnLeftLabel'} text={"Lock Camera:"} />
      <Panel className={'lockCameraBtnPanel'}>
        <ToggleButton
          selected={props.locked}
          onactivate={() => props.setCameraLocked(!props.locked)}
        />
      </Panel>
      <Label className={'lockCameraBtnRightLabel'} text={props.locked ? "Locked" : "Unlocked"} />
    </Panel>
  );
}

export default connector(LockCameraBtn);