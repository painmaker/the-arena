import React, { useEffect, useState } from 'react';
import { SCHEDULE_THINK_FAST } from '../../../App';
import { Message } from '../../../types/chatTypes';
import { getHudElement } from '../../../utils/HudElements';
import { cancelSchedule } from '../../../utils/Schedule';
import { Styles } from './Styles';

type Props = {
  message: Message,
}

const ChatMessage = (props: Props) => {

  const [opacity, setOpacity] = useState('1');
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    let schedule = -1 as ScheduleID;
    const update = () => {
      const isActive = getHudElement('HudChat')?.BHasClass('Active');
      setIsChatActive(isActive !== undefined ? isActive : false);
      schedule = $.Schedule(SCHEDULE_THINK_FAST, update)
    };
    update();
    return () => cancelSchedule(schedule, ChatMessage.name);
  }, []);

  useEffect(() => {
    const schedule = $.Schedule(10, () => setOpacity('0'));
    return () => cancelSchedule(schedule, ChatMessage.name);
  }, []);

  return (
    <Panel style={Styles.container(isChatActive, opacity)}>
      {props.message.heroname && (
        <DOTAHeroImage
          heroname={props.message.heroname}
          heroimagestyle={'icon'}
          style={Styles.heroImage()}
        />
      )}
      {props.message.playername && (
        <Label
          text={props.message.playername + ': '}
          style={Styles.playernameLabel(props.message.playerid)}
        />
      )}
      {props.message.playerid === -1 && (
        <Label
          style={Styles.chatMessageSystemText()}
          text={'[SYSTEM]:'}
        />
      )}
      <Label
        style={Styles.chatMessageText()}
        text={props.message.text.replace(/(^|\W)#(\w+)/g, (_, $1, $2) => $1 + $.Localize($2))}
      />
    </Panel>
  );

}



export default React.memo(ChatMessage);
