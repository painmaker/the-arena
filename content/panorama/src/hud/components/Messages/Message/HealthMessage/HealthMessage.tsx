import React from 'react';
import { toColor } from '../../../../utils/Color';
import { HealthMessageData } from '../../Messages';
import Styles from './styles.module.css';
import ParentStyles from './../styles.module.css';

type Props = {
  data: HealthMessageData,
}

const HealthMessage = (props: Props) => {

  const { data } = props;
  const { unit, broadcaster } = data;

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
          {!isUnitHero && (
            <Label
              className={ParentStyles.unitLabel}
              text={$.Localize(unitName)}
            />
          )}
          {isUnitHero && (
            <DOTAHeroImage
              heroimagestyle={'icon'}
              heroname={unitName}
              className={ParentStyles.heroImage}
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
        text={'Has '}
      />
      <Label
        html={true}
        className={Styles.healthLabel}
        style={{ color: isUnitEnemy ? 'red' : 'green' }}
        text={((Entities.GetHealth(unit) / Entities.GetMaxHealth(unit)) * 100).toFixed(0) + '% '}
      />
      <Label
        html={true}
        className={ParentStyles.textLabel}
        text={' Health'}
      />
    </Panel>
  );

}

export default React.memo(HealthMessage);
