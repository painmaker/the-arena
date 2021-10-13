import React, { useEffect, useState } from "react";
import { aura_modifiers } from "../../../data/auras";
import Stacks from "./Stacks/Stacks";
import { Styles } from "./Styles";
import TimedBackground from "./TimedBackground/TimedBackground";

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
};

const Modifier = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers rendered");

  const { buff, selectedUnit, isDebuff } = props;

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

  const panelId = isDebuff ? "debuff_" + buff : "buff_" + buff;
  const ability = Buffs.GetAbility(selectedUnit, buff);
  const isItem = Abilities.IsItem(ability);
  const isAura = aura_modifiers.includes(Buffs.GetName(selectedUnit, buff));
  const isEnemy = Entities.IsEnemy(selectedUnit);

  return (
    <Panel
      id={panelId}
      hittest={true}
      style={Styles.Container(isMounted, isHovering)}
      onactivate={() => {
        GameEvents.SendCustomGameEventToAllClients("on_modifier_alerted", {
          broadcaster: Players.GetLocalPlayer(),
          selectedUnit,
          modifier: buff
        })
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
          $.DispatchEvent("DOTAShowBuffTooltip", thisPanel, selectedUnit, buff, isEnemy)
        }
        setIsHovering(true);
      }}
    >
      {isAura && (
        <Panel style={Styles.Background(isDebuff)} />
      )}
      {!isAura && (
        <TimedBackground
          buff={buff}
          selectedUnit={selectedUnit}
          isDebuff={isDebuff}
        />
      )}
      <Panel style={Styles.Foreground()}>
        <Stacks
          unit={selectedUnit}
          buff={buff}
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
            itemname={Buffs.GetTexture(selectedUnit, buff)}
            showtooltip={false}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default React.memo(Modifier);
