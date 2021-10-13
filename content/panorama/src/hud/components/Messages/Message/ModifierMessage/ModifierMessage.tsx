import React from 'react';
import { toColor } from '../../../../utils/Color';
import { ModifierMessageData } from '../../Messages';
import { Styles } from './Styles';

type Props = {
  data: ModifierMessageData,
}

const getText = (modifier: BuffID, unit: EntityIndex) => {
  const localizedItemName = $.Localize("DOTA_Tooltip_" + Buffs.GetName(unit, modifier));
  const remaining = Buffs.GetRemainingTime(unit, modifier);
  if (remaining > 0) {
    return localizedItemName + ' ( ' + Math.ceil(remaining).toFixed(0) + " Seconds Remain )";
  }
  return localizedItemName;
}

const ModifierMessage = (props: Props) => {

  const { data } = props;
  const { unit, modifier, broadcaster } = data;

  const unitPlayerID = Entities.GetPlayerOwnerID(unit);
  const isEnemy = Entities.IsEnemy(unit);

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
          <Label
            html={true}
            style={Styles.EnemyOrAllyLabel()}
            text={isEnemy ? 'Enemy' : 'Ally'}
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
      <DOTAAbilityImage
        style={Styles.ItemImage()}
        abilityname={Abilities.GetAbilityName(Buffs.GetAbility(unit, modifier))}
        showtooltip={false}
      />
      <Label
        html={true}
        style={Styles.TextLabel()}
        text={'Affected By: '}
      />
      <Label
        html={true}
        style={Styles.ModifierLabel(Buffs.IsDebuff(unit, modifier))}
        text={getText(modifier, unit)}
      />
    </Panel>
  );

}

export default React.memo(ModifierMessage);
