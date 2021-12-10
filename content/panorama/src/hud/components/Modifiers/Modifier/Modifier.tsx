import React, { useEffect, useState } from "react";
import { aura_modifiers } from "../../../data/auras";
import Styles from './styles.module.css';
import Background from "./Background/Background";
import Foreground from "./Foreground/Foreground";

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
};

const onRightClick = (panelId: string, selectedUnit: EntityIndex, modifier: BuffID) => {
  if (GameUI.IsAltDown()) {
    $('#' + panelId).RemoveClass('btnClicked');
    $('#' + panelId).AddClass('btnClicked');
    GameEvents.SendCustomGameEventToAllClients("on_modifier_alerted", {
      broadcaster: Players.GetLocalPlayer(),
      selectedUnit,
      modifier,
    })
  }
}

const onMouseOut = (panelId: string) => {
  const thisPanel = $("#" + panelId);
  if (thisPanel) {
    $.DispatchEvent("DOTAHideBuffTooltip", thisPanel)
  }
}

const onMouseOver = (panelId: string, selectedUnit: EntityIndex, buff: BuffID, isEnemy: boolean) => {
  const thisPanel = $("#" + panelId);
  if (thisPanel) {
    $.DispatchEvent("DOTAShowBuffTooltip", thisPanel, selectedUnit, buff, isEnemy);
  }
}


const Modifier = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers rendered");

  const { buff, selectedUnit, isDebuff } = props;

  const [isMounted, setIsMounted] = useState(false);

  const panelId = isDebuff ? "debuff_" + buff : "buff_" + buff;
  const isEnemy = Entities.IsEnemy(selectedUnit);
  const isAura = aura_modifiers.includes(Buffs.GetName(selectedUnit, buff));

  useEffect(() => {
    setIsMounted(true);
    return () => {
      const panel = $("#" + panelId);
      if (panel) {
        $.DispatchEvent("DOTAHideBuffTooltip", $.GetContextPanel());
      }
    }
  }, []);

  return (
    <Panel
      id={panelId}
      style={{
        opacity: isMounted ? "1.0" : "0.0",
        preTransformScale2d: isMounted ? "1.0" : "0.0",
      }}
      className={Styles.container}
      onactivate={() => onRightClick(panelId, selectedUnit, buff)}
      onmouseout={() => onMouseOut(panelId)}
      onmouseover={() => onMouseOver(panelId, selectedUnit, buff, isEnemy)}
    >
      <Background
        buff={buff}
        selectedUnit={selectedUnit}
        isDebuff={isDebuff}
        isAura={isAura}
      />
      <Foreground
        buff={buff}
        selectedUnit={selectedUnit}
        panelId={panelId}
      />
    </Panel>
  );

};

export default React.memo(Modifier);