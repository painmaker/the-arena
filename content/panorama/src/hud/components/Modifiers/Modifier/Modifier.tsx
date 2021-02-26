import React, { useEffect } from "react";
import { aura_modifiers } from "../../../data/auras";
import Stacks from "./Stacks/Stacks";
import TimedBackground from "./TimedBackground/TimedBackground";

type Props = {
  buffId: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
};

const Modifier = (props: Props) => {

  useEffect(() => {
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
  // TODO : Stacks 

  return (
    <Panel
      id={panelId}
      className={'modifierContainer'}
      hittest={true}
      style={{ opacity: '1.0', preTransformScale2d: '1.0' }}
      onactivate={() => Players.BuffClicked(props.selectedUnit, props.buffId, GameUI.IsAltDown())}
      onmouseout={() => {
        const thisPanel = $("#" + panelId);
        if (thisPanel) {
          $.DispatchEvent("DOTAHideBuffTooltip", thisPanel)
        }
      }}
      onmouseover={() => {
        const thisPanel = $("#" + panelId);
        if (thisPanel) {
          $.DispatchEvent("DOTAShowBuffTooltip", thisPanel, props.selectedUnit, props.buffId, isEnemy)
        }
      }}
    >
      { isAura && (
        <Panel
          className={'modifierBackground'}
          style={{ backgroundColor: props.isDebuff ? 'red' : 'greenyellow' }}
        />
      )}
      { !isAura && (
        <TimedBackground
          buffId={props.buffId}
          selectedUnit={props.selectedUnit}
          isDebuff={props.isDebuff}
        />
      )}
      <Panel className={'modifierForeground'}>
        <Stacks
          unit={props.selectedUnit}
          buff={props.buffId}
        />
        {!isItem && (
          <DOTAAbilityImage
            key={panelId}
            className={'modifierImage'}
            abilityname={Abilities.GetAbilityName(ability)}
          />
        )}
        {isItem && (
          <DOTAItemImage
            key={panelId}
            className={'modifierImageWithPadding'}
            itemname={Buffs.GetTexture(props.selectedUnit, props.buffId)}
            showtooltip={false}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default Modifier;
