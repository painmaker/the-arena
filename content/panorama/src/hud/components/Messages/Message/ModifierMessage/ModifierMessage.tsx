import React from 'react';
import { toColor } from '../../../../utils/Color';
import { ModifierMessageData } from '../../Messages';
import { Styles } from './Styles';

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
      <Label
        html={true}
        style={Styles.TextLabel()}
        text={'Affected By: '}
      />
      <DOTAAbilityImage
        style={Styles.ModifierImage()}
        abilityname={Abilities.GetAbilityName(Buffs.GetAbility(unit, modifier))}
        showtooltip={false}
      />
      <Label
        style={Styles.ModifierLabel(Buffs.IsDebuff(unit, modifier))}
        text={$.Localize("DOTA_Tooltip_" + Buffs.GetName(unit, modifier))}
      />
      <Label
        style={Styles.ModifierExtraLabel()}
        text={getExtraText(modifier, unit)}
      />
    </Panel>
  );

}

export default React.memo(ModifierMessage);
