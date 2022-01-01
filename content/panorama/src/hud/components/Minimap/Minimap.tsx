import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import GameTime from "./GameTime/GameTime";
import Styles from "./styles.module.css";

const mapStateToProps = (state: RootState) => ({
  zoom: state.minimapReducer.zoom,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const onClick = () => false;

const Minimap = (props: Props) => {

  // $.Msg("REACT-RENDER: Minimap rendered");

  const [zoneName, setZoneName] = useState('#ZoneName');

  useGameEvent("set_zone_name", (event) => {
    setZoneName(event.zoneName);
  }, []);

  return (
    <Panel 
      id={'minimap'} 
      className={Styles.container}
      hittest={false}
     >
      <Panel className={Styles.topFlare} />
      <Panel onactivate={onClick} className={Styles.minimapContainer} >
        <Label 
          className={Styles.zoneName} 
          text={zoneName} 
        />
        <GameTime />
        <DOTAHUDOverlayMap
          className={Styles.minimap}
          mapscale={props.zoom}
          hittest={false}
          hittestchildren={false}
          maptexture={"materials/overviews/the_arena_tga_5f0a2a04.vtex"}
        />
      </Panel>
      <Panel className={Styles.rightFlare} />
    </Panel>
  );

};

export default React.memo(connector(Minimap));
