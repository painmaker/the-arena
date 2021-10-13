import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Message as IMessage, AbilityMessageData, MessageType } from '../Messages';
import { Styles } from './Styles';
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import AbilityMessage from './AbilityMessage/AbilityMessage';

type Props = ReactTimeoutProps & {
  message: IMessage,
  setMessages: Dispatch<SetStateAction<IMessage[]>>,
}

const Message = (props: Props) => {

  const { message, setMessages, setTimeout, clearTimeout } = props;
  const { id, type, data, broadcaster } = message;

  const [opacity, setOpacity] = useState('1.0');

  useEffect(() => {
    const update = () => {
      setMessages(prevState => prevState.filter(msg => msg.id !== id));
    }
    const timerId = setTimeout!(update, 5600);
    return () => clearTimeout!(timerId);
  }, [id, setMessages, setTimeout, clearTimeout]);

  useEffect(() => {
    const update = () => {
      setOpacity('0.0');
    }
    const timerId = setTimeout!(update, 5000);
    return () => clearTimeout!(timerId);
  }, [setTimeout, clearTimeout]);

  return (
    <Panel style={Styles.Container(opacity)}>
      {type === MessageType.ABILITY && (
        <AbilityMessage
          broadcaster={broadcaster}
          data={data as AbilityMessageData}
        />
      )}
    </Panel>
  );

}

export default React.memo(ReactTimeout(Message));
