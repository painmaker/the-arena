import React from "react";

interface IProps {}
interface IState {}

export default class ButtonGroup extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <Panel hittest={false} className={"buttonGroupContainer"}>
                {/* <LockCameraBtn />
                <CameraZoomSlider />
                <MapZoomSlider onMapZoomChanged={this.props.onMapZoomChanged} /> */}
            </Panel>
        );
    }

}
