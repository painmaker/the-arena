import React, { useEffect, useState } from "react";
import { aura_modifiers } from "../../../data/auras";
import withReactTimeout, { ReactTimeoutProps } from "../../../hoc/ReactTimeout";
import TimedBackground from "./TimedBackground/TimedBackground";

type Props = ReactTimeoutProps & {
  buffId: BuffID,
  selectedUnit: EntityIndex,
  isDebuff: boolean,
};

const Modifier = (props: Props) => {

  const [isHidden, setIsHidden] = useState(Buffs.IsHidden(props.selectedUnit, props.buffId));

  useEffect(() => {
    const id = props.setInterval(() => {
      setIsHidden(Buffs.IsHidden(props.selectedUnit, props.buffId));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  const panelId = props.isDebuff ? "debuff_" + props.buffId : "buff_" + props.buffId;
  const ability = Buffs.GetAbility(props.selectedUnit, props.buffId);
  const isItem = Abilities.IsItem(ability);
  const isAura = aura_modifiers.includes(Buffs.GetName(props.selectedUnit, props.buffId));

  return (
    <React.Fragment>
      { !isHidden && (
        <Panel className={'modifierContainer'} style={{ opacity: '1.0', preTransformScale2d: '1.0' }}>
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
            {!isItem && (
              <DOTAAbilityImage
                key={panelId}
                id={panelId}
                className={'modifierImage'}
                abilityname={Abilities.GetAbilityName(ability)}
                onmouseout={() => $.DispatchEvent("DOTAHideAbilityTooltip", $("#" + panelId))}
                onmouseover={() => {
                  $.DispatchEvent(
                    "DOTAShowAbilityTooltipForEntityIndex",
                    $("#" + panelId),
                    Abilities.GetAbilityName(ability),
                    props.selectedUnit
                  );
                }}
              />
            )}
            {isItem && (
              <DOTAItemImage
                key={panelId}
                className={'modifierImageWithPadding'}
                itemname={Buffs.GetTexture(props.selectedUnit, props.buffId)}
              />
            )}
          </Panel>
        </Panel>
      )}
    </React.Fragment>
  );
};

export default withReactTimeout(Modifier);
