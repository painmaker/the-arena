import React, { useEffect, useState } from "react";
import { aura_modifiers } from "../../../data/auras";
import Styles from './styles.module.css';
import Background from "./Background/Background";
import Foreground from "./Foreground/Foreground";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";

type Props = {
  modifier: BuffID,
  selectedEntityIndex: EntityIndex,
};

const onRightClick = (selectedEntityIndex: EntityIndex, modifier: BuffID) => {
  $.Msg(`Modifier: ${Buffs.GetName(selectedEntityIndex, modifier)}`);
  if (GameUI.IsAltDown()) {
    $(`#modifier_${modifier}_${selectedEntityIndex}`).RemoveClass('btnClicked');
    $(`#modifier_${modifier}_${selectedEntityIndex}`).AddClass('btnClicked');
    GameEvents.SendCustomGameEventToAllClients("on_modifier_alerted", {
      broadcaster: Players.GetLocalPlayer(),
      selectedEntityIndex,
      modifier,
    })
  }
}

const onMouseOut = (selectedEntityIndex: EntityIndex, modifier: BuffID) => {
  const thisPanel = $(`#modifier_${modifier}_${selectedEntityIndex}`);
  if (thisPanel) {
    $.DispatchEvent("DOTAHideBuffTooltip", thisPanel)
  }
}

const onMouseOver = (selectedEntityIndex: EntityIndex, modifier: BuffID, isDebuff: boolean) => {
  const thisPanel = $(`#modifier_${modifier}_${selectedEntityIndex}`);
  if (thisPanel) {
    $.DispatchEvent("DOTAShowBuffTooltip", thisPanel, selectedEntityIndex, modifier, isDebuff);
  }
}


const Modifier = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifier rendered");

  const { modifier, selectedEntityIndex } = props;

  const [show, setShow] = useState(false);

  const isDebuff = Buffs.IsDebuff(selectedEntityIndex, modifier);
  const isAura = aura_modifiers.includes(Buffs.GetName(selectedEntityIndex, modifier));

  useEffect(() => {
    setShow(true);
    return () => {
      const panel = $("#modifier_" + modifier);
      if (panel) {
        $.DispatchEvent("DOTAHideBuffTooltip", $.GetContextPanel());
      }
    }
  }, []);

  useInterval(() => {
    if (!isAura) {
      const remaining = Math.max(0, Buffs.GetRemainingTime(selectedEntityIndex, modifier));
      setShow(0.05 < remaining)
    }
  }, HUD_THINK_FAST);

  return (
    <Panel
      id={`modifier_${modifier}_${selectedEntityIndex}`}
      style={{
        opacity: show ? "1.0" : "0.5",
        preTransformScale2d: show ? "1.0" : "0.3",
      }}
      className={Styles.container}
      onactivate={() => onRightClick(selectedEntityIndex, modifier)}
      onmouseout={() => onMouseOut(selectedEntityIndex, modifier)}
      onmouseover={() => onMouseOver(selectedEntityIndex, modifier, isDebuff)}
    >
      <Background
        modifier={modifier}
        selectedEntityIndex={selectedEntityIndex}
        isAura={isAura}
      />
      <Foreground
        modifier={modifier}
        selectedEntityIndex={selectedEntityIndex}
      />
    </Panel>
  );

};

export default React.memo(Modifier);