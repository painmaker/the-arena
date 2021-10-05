import React, { Dispatch, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import CameraZoomSlider from "./CameraZoomSlider/CameraZoomSlider";
import LockCameraBtn from "./LockCameraBtn/LockCameraBtn";
import MapZoomSlider from "./MapZoomSlider/MapZoomSlider";
import Divider from "./Divider/Divider";
import Title from "./Title/Title";
import { setCameraLocked, setCameraZoom } from "../../actions/settingsAction";
import { SettingsActionTypes } from "../../types/settingsTypes";
import { Styles } from "./Styles";
import { SCHEDULE_THINK_SLOW } from "../../App";

const mapStateToProps = (state: RootState) => ({
  visible: state.settingsReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionTypes>) => ({
  setCameraLocked: (locked: boolean) => dispatch(setCameraLocked(locked)),
  setCameraZoom: (zoom: number) => dispatch(setCameraZoom(zoom)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const Settings = (props: Props) => {

  $.Msg("REACT-RENDER: Settings rendered");

  const { visible, setCameraLocked, setCameraZoom } = props;

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    setCameraLocked(true);
    setCameraZoom(1600);
  }, [setCameraLocked, setCameraZoom]);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    if (visible === false) {
      schedule = $.Schedule(SCHEDULE_THINK_SLOW, () => setRenderComponent(false));
    } else {
      setRenderComponent(true);
    }
    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Settings schedule not found: " + schedule) }; }
  }, [visible]);

  return (
    <Panel style={Styles.OuterContainer()}>
      {renderComponent && (
        <Panel style={Styles.InnerContainer(visible)}>
          <Title />
          <Divider />
          <Panel style={Styles.EntryContainer()}>
            <CameraZoomSlider />
          </Panel>
          <Divider />
          <Panel style={Styles.EntryContainer()}>
            <MapZoomSlider />
          </Panel>
          <Divider />
          <Panel style={Styles.EntryContainer()}>
            <LockCameraBtn />
          </Panel>
          <Divider />
        </Panel>
      )}
    </Panel>
  );

};

export default React.memo(connector(Settings));
