import React, { useState } from "react";
import useGameEvent from "../../hooks/useGameEvent";
import GameTime from "./GameTime/GameTime";
import Styles from "./styles.module.css";

const onClick = () => {
  GameUI.SendCustomHUDError("Unclickable", "General.InvalidTarget_Invulnerable");
  return false;
}

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
    <Panel id={'minimap'} className={Styles.container} hittest={false}>
      <Panel className={Styles.topFlare} />
      <Panel className={Styles.flowRight}>
        <Panel className={Styles.minimapContainer} onactivate={onClick} oncontextmenu={onClick}>
          <Label className={Styles.zoneName} text={zoneName} />
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
    </Panel>
  );

};

export default React.memo(Minimap);
