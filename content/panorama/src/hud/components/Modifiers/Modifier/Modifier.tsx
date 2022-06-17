import React, { useEffect, useState } from "react";
import { aura_modifiers } from "../../../data/auras";
import Styles from './styles.module.css';
import Background from "./Background/Background";
import Foreground from "./Foreground/Foreground";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";

type Props = {
  buff: BuffID,
  selectedEntityIndex: EntityIndex,
};

const onRightClick = (selectedEntityIndex: EntityIndex, buff: BuffID) => {
  if (GameUI.IsAltDown()) {
    $('#buff_' + buff).RemoveClass('btnClicked');
    $('#buff_' + buff).AddClass('btnClicked');
    GameEvents.SendCustomGameEventToAllClients("on_modifier_alerted", {
      broadcaster: Players.GetLocalPlayer(),
      selectedEntityIndex,
      modifier: buff,
    })
  }
}

const onMouseOut = (buff: BuffID) => {
  const thisPanel = $("#buff_" + buff);
  if (thisPanel) {
    $.DispatchEvent("DOTAHideBuffTooltip", thisPanel)
  }
}

const onMouseOver = (selectedEntityIndex: EntityIndex, buff: BuffID, isDebuff: boolean) => {
  const thisPanel = $("#buff_" + buff);
  if (thisPanel) {
    $.DispatchEvent("DOTAShowBuffTooltip", thisPanel, selectedEntityIndex, buff, isDebuff);
  }
}


const Modifier = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers rendered");

  const { buff, selectedEntityIndex } = props;

  const [show, setShow] = useState(false);

  const isDebuff = Buffs.IsDebuff(selectedEntityIndex, buff);
  const isAura = aura_modifiers.includes(Buffs.GetName(selectedEntityIndex, buff));

  useEffect(() => {
    setShow(true);
    return () => {
      const panel = $("#buff_" + buff);
      if (panel) {
        $.DispatchEvent("DOTAHideBuffTooltip", $.GetContextPanel());
      }
    }
  }, []);

  useInterval(() => {
    if (!isAura) {
      const remaining = Math.max(0, Buffs.GetRemainingTime(selectedEntityIndex, buff));
      if (0.05 > remaining) {
        setShow(false);
      }
    }
  }, HUD_THINK_FAST);

  return (
    <Panel
      id={'buff_' + buff}
      style={{
        opacity: show ? "1.0" : "0.5",
        preTransformScale2d: show ? "1.0" : "0.3",
      }}
      className={Styles.container}
      onactivate={() => onRightClick(selectedEntityIndex, buff)}
      onmouseout={() => onMouseOut(buff)}
      onmouseover={() => onMouseOver(selectedEntityIndex, buff, isDebuff)}
    >
      <Background
        buff={buff}
        selectedEntityIndex={selectedEntityIndex}
        isAura={isAura}
      />
      <Foreground
        buff={buff}
        selectedEntityIndex={selectedEntityIndex}
      />
    </Panel>
  );

};

export default React.memo(Modifier);