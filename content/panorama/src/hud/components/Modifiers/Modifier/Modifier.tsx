import React, { useEffect, useState } from "react";
import { aura_modifiers } from "../../../data/auras";
import Stacks from "./Stacks/Stacks";
import { Styles } from "./Styles";
import TimedBackground from "./TimedBackground/TimedBackground";

type Props = {
  buffId: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
};

const Modifier = (props: Props) => {

  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      const panel = $("#" + panelId);
      if (panel) {
        $.DispatchEvent("DOTAHideBuffTooltip", panel);
      }
    }
  }, []);

  const panelId = props.isDebuff ? "debuff_" + props.buffId : "buff_" + props.buffId;
  const ability = Buffs.GetAbility(props.selectedUnit, props.buffId);
  const isItem = Abilities.IsItem(ability);
  const isAura = aura_modifiers.includes(Buffs.GetName(props.selectedUnit, props.buffId));
  const isEnemy = Entities.IsEnemy(props.selectedUnit);

  return (
    <Panel
      id={panelId}
      hittest={true}
      style={Styles.Container(isMounted, isHovering)}
      onactivate={() => {
        $.Msg("Modifier clicked: " + Buffs.GetName(props.selectedUnit, props.buffId));
        Players.BuffClicked(props.selectedUnit, props.buffId, GameUI.IsAltDown());
      }}
      onmouseout={() => {
        const thisPanel = $("#" + panelId);
        if (thisPanel) {
          $.DispatchEvent("DOTAHideBuffTooltip", thisPanel)
        }
        setIsHovering(false)
      }}
      onmouseover={() => {
        const thisPanel = $("#" + panelId);
        if (thisPanel) {
          $.DispatchEvent("DOTAShowBuffTooltip", thisPanel, props.selectedUnit, props.buffId, isEnemy)
        }
        setIsHovering(true);
      }}
    >
      {isAura && (
        <Panel style={Styles.Background(props.isDebuff)} />
      )}
      {!isAura && (
        <TimedBackground
          buffId={props.buffId}
          selectedUnit={props.selectedUnit}
          isDebuff={props.isDebuff}
        />
      )}
      <Panel style={Styles.Foreground()}>
        <Stacks
          unit={props.selectedUnit}
          buff={props.buffId}
        />
        {!isItem && (
          <DOTAAbilityImage
            key={panelId}
            style={Styles.Image()}
            abilityname={Abilities.GetAbilityName(ability)}
          />
        )}
        {isItem && (
          <DOTAItemImage
            key={panelId}
            style={Styles.PaddedImage()}
            itemname={Buffs.GetTexture(props.selectedUnit, props.buffId)}
            showtooltip={false}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default Modifier;
