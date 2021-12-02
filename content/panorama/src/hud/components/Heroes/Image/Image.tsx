import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";
import { RootState } from "../../../reducers/rootReducer";
import Styles from "./styles.module.css";

const mapStateToProps = (state: RootState) => ({
  cameraLocked: state.settingsReducer.cameraLocked,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  hero: EntityIndex;
};

const onHeroImageClicked = (hero: EntityIndex, cameraLocked: boolean) => {

  const isAlive = Entities.IsAlive(hero);
  const issSelectable = Entities.IsSelectable(hero);
  const clickbehaviors = GameUI.GetClickBehaviors();

  if (!isAlive) {
    GameUI.SendCustomHUDError("Target Is Dead", "General.InvalidTarget_Invulnerable")
    return;
  }

  if (!issSelectable) {
    GameUI.SendCustomHUDError("Target Is Unselectable", "General.InvalidTarget_Invulnerable")
    return;
  }

  if (clickbehaviors === CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_CAST) {
    if (DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
      const order = {
        AbilityIndex: Abilities.GetLocalPlayerActiveAbility(),
        QueueBehavior: OrderQueueBehavior_t.DOTA_ORDER_QUEUE_NEVER,
        ShowEffects: true,
        OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TARGET,
        TargetIndex: hero,
      };
      Game.PrepareUnitOrders(order);
    }
  } else {
    if (cameraLocked) {
      GameUI.SendCustomHUDError("Camera Is Locked", "General.InvalidTarget_Invulnerable")
      return;
    }
    GameUI.SetCameraTargetPosition(Entities.GetAbsOrigin(hero), 0.3);
    Game.EmitSound("ui_topmenu_select");
  }

};

const ImageImpl = (props: Props) => {

  // $.Msg("REACT-RENDER: Heroes - HeroImage rendered");

  const { hero, cameraLocked } = props;

  const [washColor, setWashColor] = useState("none");
  const [isDisconnected, setIsDisconnected] = useState(false);

  useEffect(() => {
    const handle = GameEvents.Subscribe("entity_killed", (event) => {
      if (event.entindex_killed === hero && !isDisconnected) {
        setWashColor("grey");
      }
    });
    return () => GameEvents.Unsubscribe(handle);
  }, []);

  useEffect(() => {
    const handle = GameEvents.Subscribe("npc_spawned", (event) => {
      if (event.entindex === hero && !isDisconnected) {
        setWashColor("none");
      }
    });
    return () => GameEvents.Unsubscribe(handle);
  }, []);

  useInterval(() => {
    const playerInfo = Game.GetPlayerInfo(Entities.GetPlayerOwnerID(hero));
    if (playerInfo) {
      const isDisconnected = playerInfo.player_connection_state === DOTAConnectionState_t.DOTA_CONNECTION_STATE_DISCONNECTED ||
        playerInfo.player_connection_state === DOTAConnectionState_t.DOTA_CONNECTION_STATE_ABANDONED ||
        playerInfo.player_connection_state === DOTAConnectionState_t.DOTA_CONNECTION_STATE_FAILED;
      setIsDisconnected(isDisconnected);
      if (isDisconnected) {
        setWashColor("grey");
      }
    }
  }, HUD_THINK_FAST);

  return (
    <Panel className={Styles.container}  >
      {isDisconnected && (
        <Image
          src={"s2r://panorama/images/hud/reborn/icon_disconnect_png.vtex"}
          className={Styles.disconnected}
        />
      )}
      <DOTAHeroImage
        heroname={Entities.GetUnitName(hero)}
        heroimagestyle="landscape"
        onactivate={() => onHeroImageClicked(hero, cameraLocked)}
        oncontextmenu={() => onHeroImageClicked(hero, cameraLocked)}
        className={Styles.image}
        style={{ washColor: washColor }}
      />
    </Panel>
  );

};

export default React.memo(connector(ImageImpl));
