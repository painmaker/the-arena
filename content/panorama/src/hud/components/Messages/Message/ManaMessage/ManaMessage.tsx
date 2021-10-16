import React from 'react';
import { toColor } from '../../../../utils/Color';
import { ManaMessageData } from '../../Messages';
import { Styles } from './Styles';

type Props = {
  data: ManaMessageData,
}

const ManaMessage = (props: Props) => {

  const { data } = props;
  const { unit, broadcaster } = data;

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
          {!isUnitHero && (
            <Label
              style={Styles.UnitLabel()}
              text={$.Localize(unitName)}
            />
          )}
          {isUnitHero && (
            <DOTAHeroImage
              heroimagestyle={'icon'}
              heroname={unitName}
              style={Styles.HeroImage()}
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
        text={'Has '}
      />
      <Label
        html={true}
        style={Styles.ManaLabel()}
        text={((Entities.GetMana(unit) / Entities.GetMaxMana(unit)) * 100).toFixed(0) + '% '}
      />
      <Label
        html={true}
        style={Styles.TextLabel()}
        text={' Mana'}
      />
    </Panel>
  );

}

export default React.memo(ManaMessage);
