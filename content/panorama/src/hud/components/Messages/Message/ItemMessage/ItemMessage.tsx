import React from 'react';
import { toColor } from '../../../../utils/Color';
import { Styles } from './Styles';
import { ItemMessageData } from '../../Messages';

type Props = {
  broadcaster: PlayerID,
  data: ItemMessageData,
}

const getText = (item: ItemEntityIndex, unit: EntityIndex) => {
  const localizedItemName = $.Localize("DOTA_Tooltip_ability_" + Abilities.GetAbilityName(item));
  const cooldown = Abilities.GetCooldownTimeRemaining(item);
  const manaCost = Abilities.GetManaCost(item);
  const currentMana = Entities.GetMana(unit);
  if (cooldown > 0) {
    return localizedItemName + ': On Cooldown - ( ' + Math.ceil(cooldown).toFixed(0) + " Seconds Remain )";
  }
  if (manaCost > currentMana) {
    return localizedItemName + ': Not Enough Mana - ( Need ' + (manaCost - currentMana) + ' More )'
  }
  return localizedItemName + ': Ready';
}

const ItemMessage = (props: Props) => {

  const { data, broadcaster } = props;
  const { unit, item } = data;

  const unitPlayerID = Entities.GetPlayerOwnerID(unit);

  return (
    <Panel style={Styles.Container()}>
      <DOTAHeroImage
        heroimagestyle={'icon'}
        heroname={Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(broadcaster))}
        style={Styles.HeroImage()}
      />
      <Label
        text={Players.GetPlayerName(broadcaster)}
        style={Styles.PlayernameLabel(toColor(broadcaster))}
      />
      {unitPlayerID !== broadcaster && (
        <React.Fragment>
          <Image
            style={Styles.ArrowImage()}
            src={'file://{images}/control_icons/chat_wheel_icon.png'}
          />
          <DOTAHeroImage
            heroimagestyle={'icon'}
            heroname={Entities.GetUnitName(unit)}
            style={Styles.HeroImage()}
          />
          <Label
            text={Players.GetPlayerName(Entities.GetPlayerOwnerID(unit))}
            style={Styles.PlayernameLabel(toColor(unitPlayerID))}
          />
        </React.Fragment>
      )}
      <Image
        style={Styles.ArrowImage()}
        src={'file://{images}/control_icons/chat_wheel_icon.png'}
      />
      <DOTAItemImage
        style={Styles.ItemImage()}
        itemname={Abilities.GetAbilityName(item)}
        showtooltip={false}
      />
      <Label
        html={true}
        style={Styles.TextLabel()}
        text={getText(item, unit)}
      />
    </Panel>
  );

}

export default React.memo(ItemMessage);
