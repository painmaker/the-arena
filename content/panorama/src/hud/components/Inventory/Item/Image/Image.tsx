import React, { useEffect, useState } from "react";
import { SCHEDULE_THINK_FAST } from "../../../../App";
import { Styles } from "./Styles";

type Props = {
  item: ItemEntityIndex,
  selectedUnit: EntityIndex,
};

const Image = (props: Props) => {

  $.Msg("REACT-RENDER: Inventory - Image rendered");

  const { item, selectedUnit } = props;

  const [isCooldownReady, setIsCooldownReady] = useState(Abilities.IsCooldownReady(item));
  const [hasEnoughMana, setHasEnoughMana] = useState(Abilities.IsOwnersManaEnough(item));
  const [texture, setTexutre] = useState(Abilities.GetAbilityTextureName(item));
  const [showLock, setShowLock] = useState(false);

  useEffect(() => {

    let schedule = -1 as ScheduleID;

    const update = () => {

      setIsCooldownReady(Abilities.IsCooldownReady(item));
      setHasEnoughMana(Abilities.IsOwnersManaEnough(item));
      setTexutre(Abilities.GetAbilityTextureName(item));

      const isMuted = Entities.IsMuted(selectedUnit);
      const isStunned = Entities.IsStunned(selectedUnit);
      const isCommandRestricted = Entities.IsCommandRestricted(selectedUnit);
      const isNightmared = Entities.IsNightmared(selectedUnit);
      const isHexed = Entities.IsHexed(selectedUnit);
      setShowLock(isMuted || isStunned || isCommandRestricted || isNightmared || isHexed);

      schedule = $.Schedule(SCHEDULE_THINK_FAST, update);

    };

    update();

    return () => { try { $.CancelScheduled(schedule) } catch { $.Msg("Schedule not found: " + schedule) }; }

  }, [selectedUnit, item]);

  return (
    <React.Fragment>
      {(isCooldownReady && showLock) && (
        <Panel style={Styles.LockIcon()} />
      )}
      <DOTAItemImage
        itemname={texture}
        style={Styles.Container(showLock, isCooldownReady, hasEnoughMana)}
      />
    </React.Fragment>
  );

};

export default React.memo(Image);
