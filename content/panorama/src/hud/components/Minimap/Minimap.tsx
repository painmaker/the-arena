import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import Styles from "./minimap.module.css";

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
    <Panel className={Styles.container} hittest={false}>
      <Panel className={Styles.overlay} >
        <DOTAHUDOverlayMap
          className={Styles.minimap}
          mapscale={props.zoom}
          hittest={false}
          hittestchildren={false}
          maptexture={"materials/overviews/the_arena_tga_5f0a2a04.vtex"}
        />
      </Panel>
      {/*
      <Label
        className={Styles.label}
        text={zoneName}
      />
      */}
    </Panel>
  );

};

export default React.memo(connector(Minimap));
