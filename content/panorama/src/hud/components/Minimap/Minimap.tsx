import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Styles } from "./Styles";

const mapStateToProps = (state: RootState) => ({
  zoom: state.minimapReducer.zoom,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const Minimap = (props: Props) => {

  // $.Msg("REACT-RENDER: Minimap rendered");

  const [zoneName, setZoneName] = useState('#ZoneName');

  useGameEvent("set_zone_name", (event) => {
    setZoneName(event.zoneName);
  }, []);

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.Overlay()} >
        <DOTAHUDOverlayMap
          style={Styles.Minimap()}
          mapscale={props.zoom}
          hittest={false}
          hittestchildren={false}
          maptexture={"materials/overviews/the_arena_tga_5f0a2a04.vtex"}
        />
      </Panel>
      <Label style={Styles.Label()} text={zoneName} />
    </Panel>
  );

};

export default connector(Minimap);
