import React, { useEffect, useState } from 'react';
import withReactTimeout, { ReactTimeoutProps } from '../../../hoc/ReactTimeout';
import { Message } from '../../../types/chatTypes';
import { getHudElement } from '../../../utils/HudElements';
import { Styles } from './Styles';

type Props = ReactTimeoutProps & {
  message: Message,
}

const ChatMessage = (props: Props) => {

  const [opacity, setOpacity] = useState('1');
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    const id = props.setInterval(() => {
      const isActive = getHudElement('HudChat')?.BHasClass('Active');
      setIsChatActive(isActive !== undefined ? isActive : false);
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  useEffect(() => {
    const opacityTimeoutID = props.setTimeout(() => {
      setOpacity('0');
    }, 10000);
    return () => props.clearTimeout(opacityTimeoutID);
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



export default withReactTimeout(ChatMessage);
