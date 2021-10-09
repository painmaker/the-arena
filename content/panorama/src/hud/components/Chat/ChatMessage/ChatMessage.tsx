import React, { useEffect, useState } from 'react';
import { HUD_THINK_FAST } from '../../../App';
import { Message } from '../../../types/chatTypes';
import { getHudElement } from '../../../utils/HudElements';
import { cancelSchedule } from '../../../utils/Schedule';
import { Styles } from './Styles';
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

type Props = ReactTimeoutProps & {
  message: Message,
}

const ChatMessage = (props: Props) => {

  const { setInterval, clearInterval, setTimeout, clearTimeout } = props;

  const [opacity, setOpacity] = useState('1');
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    const update = () => {
      const isActive = getHudElement('HudChat')?.BHasClass('Active');
      setIsChatActive(isActive !== undefined ? isActive : false);
    };
    const id = setInterval!(update, HUD_THINK_FAST);
    return () => clearInterval!(id);
  }, [setInterval, clearInterval]);

  useEffect(() => {
    const update = () => setOpacity('0');
    const id = setTimeout!(update, 10000);
    return () => clearTimeout!(id);
  }, [setTimeout, clearTimeout]);

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



export default React.memo(ReactTimeout(ChatMessage));
