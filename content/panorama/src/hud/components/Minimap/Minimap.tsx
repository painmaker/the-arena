import React, { useState } from "react";
import { useGameEvent } from "react-panorama";
import GameTime from "./GameTime/GameTime";
import Styles from "./styles.module.css";

const onClick = () => false;

const Minimap = () => {

  // $.Msg("REACT-RENDER: Minimap rendered");

  const [mapZoom, setMapZoom] = useState(5);
  const [zoneName, setZoneName] = useState('#ZoneName');

  useGameEvent("set_zone_name", (event) => {
    setZoneName(event.zoneName);
  }, []);

  useGameEvent('set_map_zoom', (event) => {
    setMapZoom(event.mapZoom);
  }, []);

  return (
    <Panel
      id={'minimap'}
      className={Styles.container}
      hittest={false}
    >
      <Panel className={Styles.topFlare} />
      <Panel
        onactivate={onClick}
        className={Styles.minimapContainer}
      >
        <Label
          className={Styles.zoneName}
          text={zoneName}
        />
        <GameTime />
        <DOTAHUDOverlayMap
          className={Styles.minimap}
          mapscale={mapZoom}
          hittest={false}
          hittestchildren={false}
          maptexture={"materials/overviews/the_arena_tga_5f0a2a04.vtex"}
        />
      </Panel>
      <Panel className={Styles.rightFlare} />
    </Panel>
  );

};

export default React.memo(Minimap);
