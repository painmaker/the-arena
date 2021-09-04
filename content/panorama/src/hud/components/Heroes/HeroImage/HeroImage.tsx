import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import { RootState } from "../../../reducers/rootReducer";
import { Styles } from "./Styles";

const mapStateToProps = (state: RootState) => ({
  cameraLocked: state.settingsReducer.cameraLocked,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  heroname: string;
  entIndex: EntityIndex;
};

const onHeroImageClicked = (entIndex: EntityIndex, cameraLocked: boolean) => {

  const isAlive = Entities.IsAlive(entIndex);
  const issSelectable = Entities.IsSelectable(entIndex);
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
        TargetIndex: entIndex,
      };
      Game.PrepareUnitOrders(order);
    }
  } else {
    if (cameraLocked) {
      GameUI.SendCustomHUDError("Camera Is Locked", "General.InvalidTarget_Invulnerable")
      return;
    }
    GameUI.SetCameraTargetPosition(Entities.GetAbsOrigin(entIndex), 0.3);
    Game.EmitSound("ui_topmenu_select");
  }

};

const HeroImage = (props: Props) => {

  const [washColor, setWashColor] = useState("none");
  const [isHovering, setIsHovering] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);

  // 
  useEffect(() => {
    const handle = GameEvents.Subscribe("entity_killed", (event) => {
      if (event.entindex_killed === props.entIndex && !isDisconnected) {
        setWashColor("grey");
      }
    });
    return () => GameEvents.Unsubscribe(handle);
  }, []);

  useEffect(() => {
    const handle = GameEvents.Subscribe("npc_spawned", (event) => {
      if (event.entindex === props.entIndex && !isDisconnected) {
        setWashColor("none");
      }
    });
    return () => GameEvents.Unsubscribe(handle);
  }, []);

  useEffect(() => {
    const id = props.setInterval(() => {
      const connectionState = Game.GetPlayerInfo(Entities.GetPlayerOwnerID(props.entIndex)).player_connection_state;
      const isDisconnected = connectionState === DOTAConnectionState_t.DOTA_CONNECTION_STATE_DISCONNECTED ||
        connectionState === DOTAConnectionState_t.DOTA_CONNECTION_STATE_ABANDONED ||
        connectionState === DOTAConnectionState_t.DOTA_CONNECTION_STATE_FAILED;
      setIsDisconnected(isDisconnected);
      if (isDisconnected) {
        setWashColor("grey")
      }
    }, 100);
    return () => props.clearInterval(id);
  }, [])

  return (
    <Panel hittest={false} style={Styles.Container(isHovering)}>
      {isDisconnected && (
        <Image
          src={"s2r://panorama/images/hud/reborn/icon_disconnect_png.vtex"}
          style={Styles.Disconnected()}
        />
      )}
      <DOTAHeroImage
        onmouseover={() => setIsHovering(true)}
        onmouseout={() => setIsHovering(false)}
        heroname={props.heroname}
        heroimagestyle="landscape"
        onactivate={() => onHeroImageClicked(props.entIndex, props.cameraLocked)}
        oncontextmenu={() => onHeroImageClicked(props.entIndex, props.cameraLocked)}
        style={Styles.Image(washColor)}
      />
    </Panel>
  );

};

export default connector(withReactTimeout(HeroImage));
