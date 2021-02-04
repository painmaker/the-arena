import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";

const mapStateToProps = (state: RootState) => ({
    zoom: state.minimapReducer.zoom,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

const Minimap = (props: Props) => {
    return (
        <Panel hittest={false} className={"minimapContainer"}>
            <DOTAHUDOverlayMap
                className={"minimap"}
                mapscale={props.zoom}
                hittest={false}
                hittestchildren={false}
                maptexture={"materials/overviews/the_arena_tga_5f0a2a04.vtex"}
            />
        </Panel>
    );
};

export default connector(Minimap);
