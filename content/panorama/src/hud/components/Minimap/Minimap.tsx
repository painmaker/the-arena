import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";

const mapStateToProps = (state: RootState) => ({
  zoom: state.minimapReducer.zoom,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

const Minimap = (props: Props) => {

  const [zoneName, setZoneName] = useState('#ZoneName');

  useGameEvent("set_zone_name", (event) => {
    setZoneName(event.zoneName);
  }, []);

  return (
    <Panel className={'minimapContainer'}>
      <Panel className={'minimapOverlayContainer'} >
        <DOTAHUDOverlayMap
          className={"minimap"}
          mapscale={props.zoom}
          hittest={false}
          hittestchildren={false}
          maptexture={"materials/overviews/the_arena_tga_5f0a2a04.vtex"}
        />
      </Panel>
      <Label className={'minimapLabel'} text={zoneName} />
    </Panel>
  );

};

export default connector(Minimap);
