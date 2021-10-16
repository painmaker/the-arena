import React from 'react';
import { toColor } from '../../../../utils/Color';
import { Styles } from './Styles';
import { AbilityMessageData } from '../../Messages';

type Props = {
  data: AbilityMessageData,
}

const getText = (ability: AbilityEntityIndex, unit: EntityIndex) => {

  const localizedAbilityName = $.Localize("DOTA_Tooltip_Ability_" + Abilities.GetAbilityName(ability));
  const cooldown = Abilities.GetCooldownTimeRemaining(ability);
  const abilityLevel = Abilities.GetLevel(ability);
  const manaCost = Abilities.GetManaCost(ability);
  const currentMana = Entities.GetMana(unit);
  const isEnemy = Entities.IsEnemy(unit);

  if (isEnemy) {
    return localizedAbilityName + ': Beware'
  }
  if (abilityLevel === 0) {
    return localizedAbilityName + ': Not Learned - ( Level ' + abilityLevel + ' )';
  }
  if (cooldown > 0) {
    return localizedAbilityName + ': On Cooldown - ( ' + Math.ceil(cooldown).toFixed(0) + " Seconds Remain )";
  }
  if (manaCost > currentMana) {
    return localizedAbilityName + ': Not Enough Mana - ( Need ' + (manaCost - currentMana) + ' More )'
  }
  return localizedAbilityName + ': Ready - ( Level ' + abilityLevel + ' )';

}

const AbilityMessage = (props: Props) => {

  const { data } = props;
  const { unit, ability, broadcaster } = data;

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
      <DOTAAbilityImage
        style={Styles.AbilityImage()}
        abilityname={Abilities.GetAbilityName(ability)}
        showtooltip={false}
      />
      <Label
        html={true}
        style={Styles.TextLabel()}
        text={getText(ability, unit)}
      />
    </Panel>
  );

}

export default React.memo(AbilityMessage);
