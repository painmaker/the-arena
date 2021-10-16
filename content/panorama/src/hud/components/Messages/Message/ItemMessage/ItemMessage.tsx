import React from 'react';
import { toColor } from '../../../../utils/Color';
import { Styles } from './Styles';
import { ItemMessageData } from '../../Messages';

type Props = {
  data: ItemMessageData,
}

const getText = (item: ItemEntityIndex, unit: EntityIndex) => {

  const localizedItemName = $.Localize("DOTA_Tooltip_ability_" + Abilities.GetAbilityName(item));
  const cooldown = Abilities.GetCooldownTimeRemaining(item);
  const manaCost = Abilities.GetManaCost(item);
  const currentMana = Entities.GetMana(unit);
  const isEnemy = Entities.IsEnemy(unit);

  if (isEnemy) {
    return localizedItemName + ': Beware'
  }
  if (cooldown > 0) {
    return localizedItemName + ': On Cooldown - ( ' + Math.ceil(cooldown).toFixed(0) + " Seconds Remain )";
  }
  if (manaCost > currentMana) {
    return localizedItemName + ': Not Enough Mana - ( Need ' + (manaCost - currentMana) + ' More )'
  }
  return localizedItemName + ': Ready';

}

const ItemMessage = (props: Props) => {

  const { data } = props;
  const { unit, item, broadcaster } = data;

  const unitOwnerPlayerID = Entities.GetPlayerOwnerID(unit);
  const unitOwnerPlayerName = Players.GetPlayerName(Entities.GetPlayerOwnerID(unit));
  const isUnitEnemy = Entities.IsEnemy(unit);
  const isUnitHero = Entities.IsHero(unit);
  const unitName = Entities.GetUnitName(unit);

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
      {unitOwnerPlayerID !== broadcaster && (
        <React.Fragment>
          <Image
            style={Styles.ArrowImage()}
            src={'file://{images}/control_icons/chat_wheel_icon.png'}
          />
          <Label
            html={true}
            style={Styles.EnemyOrAllyLabel()}
            text={isUnitEnemy ? 'Enemy' : 'Ally'}
          />
          {isUnitHero && (
            <DOTAHeroImage
              heroimagestyle={'icon'}
              heroname={unitName}
              style={Styles.HeroImage()}
            />
          )}
          {!isUnitHero && (
            <Label
              style={Styles.UnitLabel()}
              text={$.Localize(unitName)}
            />
          )}
          <Label
            text={isUnitHero ? unitOwnerPlayerName : '(' + unitOwnerPlayerName + ')'}
            style={Styles.PlayernameLabel(toColor(unitOwnerPlayerID))}
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
