import React, { useEffect, useState } from "react";
import { useGameEvent } from "react-panorama";
import Background from "./Background/Background";

interface Props {
  buffId: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
}

const showAbility = (ability: AbilityEntityIndex, selectedUnit: EntityIndex, panelId: string) => {
  const panel = $("#" + panelId);
  if (panel) {
    $.DispatchEvent(
      "DOTAShowAbilityTooltipForEntityIndex",
      panel,
      Abilities.GetAbilityName(ability),
      selectedUnit
    );
  }
}

const hideAbility = (panelId: string) => {
  const panel = $("#" + panelId);
  if (panel) {
    $.DispatchEvent("DOTAHideAbilityTooltip", panel);
  }
}

const ModifierItem = (props: Props) => {

  const [isAura, setIsAura] = useState(true);

  const texture = Buffs.GetTexture(props.selectedUnit, props.buffId);
  const ability = Buffs.GetAbility(props.selectedUnit, props.buffId);
  const panelId = props.isDebuff ? "debuff_" + props.buffId : "buff_" + props.buffId;
  const isItem = Abilities.IsItem(ability);

  useEffect(() => {
    return () => {
      const panel = $("#" + panelId);
      if (panel) {
        $.DispatchEvent("DOTAHideAbilityTooltip", panel);
      }
    }
  }, []);

  useEffect(() => {
    GameEvents.SendCustomGameEventToServer("is_modifier_aura", {
      entindex: props.selectedUnit,
      modifierName: Buffs.GetName(props.selectedUnit, props.buffId),
    });
  }, []);

  useGameEvent("is_modifier_aura_success", (event) => {
    if (event.modifierName === Buffs.GetName(props.selectedUnit, props.buffId)) {
      setIsAura(event.isAura === 1);
    }
  }, []);


  return (
    <Panel className={'modifierItemContainer'} style={{ opacity: '1.0', preTransformScale2d: '1.0' }}>
      { isAura && (
        <Panel
          className={'modifierItemBackground'}
          style={{ backgroundColor: props.isDebuff ? 'red' : 'greenyellow' }}
        />
      )}
      { !isAura && (
        <Background
          buffId={props.buffId}
          selectedUnit={props.selectedUnit}
          isDebuff={props.isDebuff}
        />
      )}
      <Panel className={'modifierItemForeground'}>
        {!isItem && (
          <DOTAAbilityImage
            key={panelId}
            id={panelId}
            className={'modifierItemImage'}
            abilityname={Abilities.GetAbilityName(ability)}
            onmouseover={() => showAbility(ability, props.selectedUnit, panelId)}
            onmouseout={() => hideAbility(panelId)}
          />
        )}
        {isItem && (
          <DOTAItemImage
            key={panelId}
            className={'modifierItemImageWithPadding'}
            itemname={texture}
          />
        )}
      </Panel>
    </Panel>
  );
};

export default ModifierItem;
