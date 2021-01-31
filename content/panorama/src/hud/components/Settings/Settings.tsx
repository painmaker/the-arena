import React, { Dispatch } from "react";
import { render } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { setVisible } from "../../actions/settingsAction";
import { RootState } from "../../reducers/rootReducer";
import { SettingsActionTypes } from "../../types/settingsTypes";
import CameraZoomSlider from "./CameraZoonSlider/CameraZoomSlider";
import LockCameraBtn from "./LockCameraBtn/LockCameraBtn";
import MapZoomSlider from "./MapZoomSlider/MapZoomSlider";

interface StateProps {
    visible: false;
}

const mapStateToProps = (state: RootState) => ({
    visible: state.settingsReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionTypes>) => ({
    setVisible: (visible: boolean) => dispatch(setVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
    // ownProps
};

const Settings = (props: Props) => {
    if (!props.visible) {
        return <Panel />;
    }
    return (
        <Panel hittest={true} className={"settingsContainer"}>
            <Label text={"Settings"} className={"settingsTitle"} />
            <Panel className={"settingsDivider"} />
            <Panel className={"settingsEntry"}>
                <LockCameraBtn />
            </Panel>
            <Panel className={"settingsDivider"} />
            <Panel className={"settingsEntry"}>
                <CameraZoomSlider />
            </Panel>
            <Panel className={"settingsDivider"} />
            <Panel className={"settingsEntry"}>
                <MapZoomSlider />
            </Panel>
        </Panel>
    );
};

export default connector(Settings);
