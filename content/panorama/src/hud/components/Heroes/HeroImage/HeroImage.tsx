import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ReactTimeoutProps } from "react-timeout";
import { RootState } from "../../../reducers/rootReducer";

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

  useEffect(() => {
    const handle = GameEvents.Subscribe("entity_killed", (event) => {
      if (event.entindex_killed === props.entIndex) {
        setWashColor("grey");
      }
    });
    return () => GameEvents.Unsubscribe(handle);
  }, []);

  useEffect(() => {
    const handle = GameEvents.Subscribe("npc_spawned", (event) => {
      if (event.entindex === props.entIndex) {
        setWashColor("none");
      }
    });
    return () => GameEvents.Unsubscribe(handle);
  }, []);

  return (
    <Panel hittest={false} className="heroesHeroImage">
      <DOTAHeroImage
        heroname={props.heroname}
        heroimagestyle="landscape"
        onactivate={() => onHeroImageClicked(props.entIndex, props.cameraLocked)}
        oncontextmenu={() => onHeroImageClicked(props.entIndex, props.cameraLocked)}
        style={{ washColor: washColor }}
      />
    </Panel>
  );

};

export default connector(HeroImage);
