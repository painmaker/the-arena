import React, { useState } from "react";
import { HUD_THINK_FAST } from "../../../../App";
import { useInterval } from "../../../../hooks/useInterval";
import Styles from "./styles.module.css";

type Props = {
  item: ItemEntityIndex,
  selectedUnit: EntityIndex,
};

const Image = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Image rendered");

  const { item, selectedUnit } = props;

  const [isCooldownReady, setIsCooldownReady] = useState(Abilities.IsCooldownReady(item));
  const [isActive, setIsActive] = useState(Abilities.GetLocalPlayerActiveAbility() === item);
  const [hasEnoughMana, setHasEnoughMana] = useState(Abilities.IsOwnersManaEnough(item));
  const [texture, setTexutre] = useState(Abilities.GetAbilityTextureName(item));
  const [isMuted, setIsMuted] = useState(Entities.IsMuted(selectedUnit));

  useInterval(() => {
    setIsMuted(Entities.IsMuted(selectedUnit));
    setIsCooldownReady(Abilities.IsCooldownReady(item));
    setHasEnoughMana(Abilities.IsOwnersManaEnough(item));
    setTexutre(Abilities.GetAbilityTextureName(item));
    setIsActive(Abilities.GetLocalPlayerActiveAbility() === item);
  }, HUD_THINK_FAST);

  return (
    <Panel
      className={Styles.container}
      style={{
        backgroundColor: isActive
          ? `gradient(
            linear,
            50% 0%,
            35% 100%,
            from(rgba(255, 255, 255, 0.8)),
            color-stop(0.5, rgba(50, 50, 50, 0.5)),
            to(rgb(0, 0, 0))
          )`
          : "black"
      }}
    >
      {(isCooldownReady && isMuted) && (
        <Panel className={Styles.lockIcon} />
      )}
      <DOTAItemImage
        itemname={texture}
        className={Styles.itemImage}
        style={{
          saturation: isCooldownReady ? '1.0' : '0.5',
          washColor: (isMuted || !isCooldownReady) ? 'rgba(100, 100, 100, 0.8)' : hasEnoughMana ? 'none' : '#1569be',
          padding: isActive ? '-2px' : !isCooldownReady ? '1px' : '0px',
        }}
      />
    </Panel>
  );

};

export default React.memo(Image);
