import React, { useEffect, useState } from "react";
import { aura_modifiers } from "../../../data/auras";
import Styles from './styles.module.css';
import Background from "./Background/Background";
import Foreground from "./Foreground/Foreground";
import { HUD_THINK_FAST } from "../../../App";
import { useInterval } from "../../../hooks/useInterval";

type Props = {
  buff: BuffID,
  selectedUnit: EntityIndex,
};

const onRightClick = (selectedUnit: EntityIndex, buff: BuffID) => {
  if (GameUI.IsAltDown()) {
    $('#buff_' + buff).RemoveClass('btnClicked');
    $('#buff_' + buff).AddClass('btnClicked');
    GameEvents.SendCustomGameEventToAllClients("on_modifier_alerted", {
      broadcaster: Players.GetLocalPlayer(),
      selectedUnit,
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

const onMouseOver = (selectedUnit: EntityIndex, buff: BuffID, isEnemy: boolean) => {
  const thisPanel = $("#buff_" + buff);
  if (thisPanel) {
    $.DispatchEvent("DOTAShowBuffTooltip", thisPanel, selectedUnit, buff, isEnemy);
  }
}


const Modifier = (props: Props) => {

  // $.Msg("REACT-RENDER: Modifiers rendered");

  const { buff, selectedUnit } = props;

  const [show, setShow] = useState(false);

  const isEnemy = Entities.IsEnemy(selectedUnit);
  const isAura = aura_modifiers.includes(Buffs.GetName(selectedUnit, buff));

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
      const remaining = Math.max(0, Buffs.GetRemainingTime(selectedUnit, buff));
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
      onactivate={() => onRightClick(selectedUnit, buff)}
      onmouseout={() => onMouseOut(buff)}
      onmouseover={() => onMouseOver(selectedUnit, buff, isEnemy)}
    >
      <Background
        buff={buff}
        selectedUnit={selectedUnit}
        isAura={isAura}
      />
      <Foreground
        buff={buff}
        selectedUnit={selectedUnit}
      />
    </Panel>
  );

};

export default React.memo(Modifier);