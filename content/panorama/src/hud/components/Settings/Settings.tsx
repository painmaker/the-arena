import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import CameraZoomSlider from "./CameraZoonSlider/CameraZoomSlider";
import LockCameraBtn from "./LockCameraBtn/LockCameraBtn";
import MapZoomSlider from "./MapZoomSlider/MapZoomSlider";
import Divider from "./Divider/Divider";
import Title from "./Title/Title";
import CloseBtn from "./CloseBtn/CloseBtn";

const mapStateToProps = (state: RootState) => ({
    visible: state.settingsReducer.visible,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

const Settings = (props: Props) => {
    useEffect(() => {
        const panel = $("#settings") as any;
        panel.SetHasClass("settingsFadeIn", props.visible);
    }, [props.visible]);

    return (
        <Panel hittest={false} style={{ width: "100%", height: "100%" }}>
            <CloseBtn />
            <Panel id={"settings"} className={"settingsWindow"}>
                <Title />
                <Divider />
                <CameraZoomSlider />
                <Divider />
                <MapZoomSlider />
                <Divider />
                <LockCameraBtn />
            </Panel>
        </Panel>
    );
};

export default connector(Settings);
