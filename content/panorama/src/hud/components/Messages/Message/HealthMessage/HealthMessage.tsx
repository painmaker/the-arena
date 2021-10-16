import React from 'react';
import { toColor } from '../../../../utils/Color';
import { HealthMessageData } from '../../Messages';
import { Styles } from './Styles';

type Props = {
  data: HealthMessageData,
}

const HealthMessage = (props: Props) => {

  const { data } = props;
  const { unit, broadcaster } = data;

  const unitPlayerID = Entities.GetPlayerOwnerID(unit);
  const isEnemy = Entities.IsEnemy(unit);
  const isHero = Entities.IsHero(unit);
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
          {isHero && (
            <DOTAHeroImage
              heroimagestyle={'icon'}
              heroname={unitName}
              style={Styles.HeroImage()}
            />
          )}
          {!isHero && (
            <Label
              style={Styles.UnitLabel()}
              text={$.Localize(unitName)}
            />
          )}
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
      <Label
        html={true}
        style={Styles.TextLabel()}
        text={'Health: '}
      />
      <Label
        html={true}
        style={Styles.HealthLabel(isEnemy)}
        text={((Entities.GetHealth(unit) / Entities.GetMaxHealth(unit)) * 100).toFixed(0) + '%'}
      />
    </Panel>
  );

}

export default React.memo(HealthMessage);
