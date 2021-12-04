import React, { useEffect, useState } from "react";
import { aura_modifiers } from "../../../data/auras";
import Stacks from "./Stacks/Stacks";
import TimedBackground from "./TimedBackground/TimedBackground";
import Styles from './styles.module.css';
import { useTimeout } from "../../../hooks/useTimeout";

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
};

const Modifier = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers rendered");

  const { buff, selectedUnit, isDebuff } = props;

  const [isMounted, setIsMounted] = useState(false);

  const panelId = isDebuff ? "debuff_" + buff : "buff_" + buff;
  const ability = Buffs.GetAbility(selectedUnit, buff);
  const isItem = Abilities.IsItem(ability);
  const isAura = aura_modifiers.includes(Buffs.GetName(selectedUnit, buff));
  const isEnemy = Entities.IsEnemy(selectedUnit);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      const panel = $("#" + panelId);
      if (panel) {
        $.DispatchEvent("DOTAHideBuffTooltip", panel);
      }
    }
  }, []);

  return (
    <Panel
      id={panelId}
      hittest={true}
      className={Styles.container}
      style={{
        opacity: isMounted ? "1.0" : "0.0",
        preTransformScale2d: isMounted ? "1.0" : "0.0",
      }}
      onactivate={() => {
        if (GameUI.IsAltDown()) {
          $('#' + panelId).RemoveClass('btnClicked');
          $('#' + panelId).AddClass('btnClicked');
          GameEvents.SendCustomGameEventToAllClients("on_modifier_alerted", {
            broadcaster: Players.GetLocalPlayer(),
            selectedUnit,
            modifier: buff
          })
        }
      }}
      onmouseout={() => {
        const thisPanel = $("#" + panelId);
        if (thisPanel) {
          $.DispatchEvent("DOTAHideBuffTooltip", thisPanel)
        }
      }}
      onmouseover={() => {
        const thisPanel = $("#" + panelId);
        if (thisPanel) {
          $.DispatchEvent("DOTAShowBuffTooltip", thisPanel, selectedUnit, buff, isEnemy)
        }
      }}
    >
      {isAura && (
        <Panel
          className={Styles.background}
          style={{ backgroundColor: isDebuff ? 'rgba(195, 40, 40, 0.9)' : 'rgba(0, 200, 20, 0.9)' }}
        />
      )}
      {!isAura && (
        <TimedBackground
          buff={buff}
          selectedUnit={selectedUnit}
          isDebuff={isDebuff}
        />
      )}
      <Panel className={Styles.foreground}>
        <Stacks
          unit={selectedUnit}
          buff={buff}
        />
        {!isItem && (
          <DOTAAbilityImage
            key={panelId}
            className={Styles.image}
            abilityname={Abilities.GetAbilityName(ability)}
          />
        )}
        {isItem && (
          <DOTAItemImage
            key={panelId}
            className={Styles.paddedImage}
            itemname={Buffs.GetTexture(selectedUnit, buff)}
            showtooltip={false}
          />
        )}
      </Panel>
    </Panel>
  );

};

export default React.memo(Modifier);
