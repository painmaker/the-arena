import React, { Dispatch, useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
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

  useGameEvent("lock_camera", () => {
    props.setCameraLocked(true);
  }, []);

  return (
    <Panel className="settingsItem">
      <Label
        style={{ width: "40%", color: "orange" }}
        text={"Lock Camera:"}
      />
      <Panel style={{ width: "8%", marginLeft: "-4px" }} hittest={false}>
        <ToggleButton
          selected={props.locked}
          onactivate={() => props.setCameraLocked(!props.locked)}
        />
      </Panel>
      <Label
        style={{
          width: "52%",
          color: "orange",
          fontSize: "16px",
          marginTop: "0.5px",
        }}
        text={props.locked ? "Locked" : "Unlocked"}
      />
    </Panel>
  );

}

export default connector(LockCameraBtn);