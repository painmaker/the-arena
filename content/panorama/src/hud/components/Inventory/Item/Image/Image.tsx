import React, { useEffect, useState } from "react";
import withReactTimeout, { ReactTimeoutProps } from "../../../../hoc/ReactTimeout";

type Props = ReactTimeoutProps & {
  item: ItemEntityIndex,
};

const Image = (props: Props) => {

  const [isCooldownReady, setIsCooldownReady] = useState(Abilities.IsCooldownReady(props.item));
  const [hasEnoughMana, setHasEnoughMana] = useState(Abilities.IsOwnersManaEnough(props.item));
  const [isMuted, setIsMuted] = useState(Entities.IsMuted(Players.GetLocalPlayerPortraitUnit()));

  useEffect(() => {
    const id = props.setInterval(() => {
      setIsCooldownReady(Abilities.IsCooldownReady(props.item));
      setHasEnoughMana(Abilities.IsOwnersManaEnough(props.item));
      setIsMuted(Entities.IsMuted(Players.GetLocalPlayerPortraitUnit()));
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  return (
    <DOTAItemImage
      className={'inventoryItemImage'}
      itemname={Abilities.GetAbilityName(props.item)}
      style={{
        saturation: isMuted ? '0.0' : !isCooldownReady ? '0.5' : '1.0',
        border: !isCooldownReady ? '3px solid rgba(50, 50, 50, 0.75)' : '0px solid black',
        washColor: hasEnoughMana ? 'none' : '#1569be',
      }}
    />
  );

};

export default withReactTimeout(Image);
