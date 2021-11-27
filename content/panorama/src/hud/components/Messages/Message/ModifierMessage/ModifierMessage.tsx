import React from 'react';
import { toColor } from '../../../../utils/Color';
import { ModifierMessageData } from '../../Messages';
import Styles from './styles.module.css';
import ParentStyles from './../styles.module.css';

type Props = {
  data: ModifierMessageData,
}

const getExtraText = (modifier: BuffID, unit: EntityIndex) => {
  const remaining = Buffs.GetRemainingTime(unit, modifier);
  if (remaining > 0) {
    return ' ( ' + Math.ceil(remaining).toFixed(0) + " Seconds Remain )";
  }
  return '';
}

const ModifierMessage = (props: Props) => {

  const { data } = props;
  const { unit, modifier, broadcaster } = data;

  const unitOwnerPlayerID = Entities.GetPlayerOwnerID(unit);
  const unitOwnerPlayerName = Players.GetPlayerName(Entities.GetPlayerOwnerID(unit));
  const isUnitEnemy = Entities.IsEnemy(unit);
  const isUnitHero = Entities.IsHero(unit);
  const unitName = Entities.GetUnitName(unit);

  return (
    <Panel className={ParentStyles.messageContainer}>
      <DOTAHeroImage
        heroimagestyle={'icon'}
        heroname={Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(broadcaster))}
        className={ParentStyles.heroImage}
      />
      <Label
        text={Players.GetPlayerName(broadcaster)}
        className={ParentStyles.playernameLabel}
        style={{ color: toColor(broadcaster) }}
      />
      {unitOwnerPlayerID !== broadcaster && (
        <React.Fragment>
          <Image
            className={ParentStyles.arrowImage}
            src={'file://{images}/control_icons/chat_wheel_icon.png'}
          />
          <Label
            html={true}
            className={ParentStyles.enemyOrAllyLabel}
            text={isUnitEnemy ? 'Enemy' : 'Ally'}
          />
          {isUnitHero && (
            <DOTAHeroImage
              heroimagestyle={'icon'}
              heroname={unitName}
              className={ParentStyles.heroImage}
            />
          )}
          {!isUnitHero && (
            <Label
              className={ParentStyles.unitLabel}
              text={$.Localize(unitName)}
            />
          )}
          <Label
            text={isUnitHero ? unitOwnerPlayerName : '(' + unitOwnerPlayerName + ')'}
            className={ParentStyles.playernameLabel}
            style={{ color: toColor(unitOwnerPlayerID) }}
          />
        </React.Fragment>
      )}
      <Image
        className={ParentStyles.arrowImage}
        src={'file://{images}/control_icons/chat_wheel_icon.png'}
      />
      <Label
        html={true}
        className={ParentStyles.textLabel}
        text={'Affected By: '}
      />
      <DOTAAbilityImage
        className={Styles.modifierImage}
        abilityname={Abilities.GetAbilityName(Buffs.GetAbility(unit, modifier))}
        showtooltip={false}
      />
      <Label
        className={Styles.modifierLabel}
        style={{ color: Buffs.IsDebuff(unit, modifier) ? 'red' : 'green' }}
        text={$.Localize("DOTA_Tooltip_" + Buffs.GetName(unit, modifier))}
      />
      <Label
        className={Styles.modifierExtraLabel}
        text={getExtraText(modifier, unit)}
      />
    </Panel>
  );

}

export default React.memo(ModifierMessage);
