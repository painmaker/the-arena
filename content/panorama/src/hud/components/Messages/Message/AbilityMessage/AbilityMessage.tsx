import React from 'react';
import { toColor } from '../../../../utils/Color';
import { Styles } from './Styles';
import { AbilityMessageData, Message } from '../../Messages';

type Props = {
  data: AbilityMessageData,
}

const getAbilityComponent = (ability: AbilityEntityIndex) => {

  const cooldown = Abilities.GetCooldownTimeRemaining(ability);
  const localizedAbilityName = $.Localize("DOTA_Tooltip_Ability_" + Abilities.GetAbilityName(ability));

  if (cooldown > 0) {
    return (
      <React.Fragment>
        <DOTAAbilityImage
          style={Styles.AbilityImage()}
          abilityname={Abilities.GetAbilityName(ability)}
          showtooltip={false}
        />
        <Label
          html={true}
          text={localizedAbilityName + ' on cooldown (' + cooldown.toFixed(1) + "s remain)."}
        />
      </React.Fragment>
    )
  }

  return null;

}

const AbilityMessage = (props: Props) => {

  const { data } = props;
  const { unit, ability } = data;

  const playerId = Entities.GetPlayerOwnerID(unit);
  const playername = Players.GetPlayerName(playerId);

  return (
    <Panel style={Styles.Container()}>
      <DOTAHeroImage
        heroimagestyle={'icon'}
        heroname={Entities.GetUnitName(unit)}
        style={Styles.HeroImage()}
      />
      <Label
        text={playername + ": "}
        style={Styles.PlayernameLabel(toColor(playerId))}
      />
      {getAbilityComponent(ability)}
    </Panel>
  );

}



export default React.memo(AbilityMessage);
