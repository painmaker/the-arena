import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Message as IMessage, AbilityMessageData, MessageType, ItemMessageData, ModifierMessageData } from '../Messages';
import { Styles } from './Styles';
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'
import AbilityMessage from './AbilityMessage/AbilityMessage';
import ItemMessage from './ItemMessage/ItemMessage';
import ModifierMessage from './ModifierMessage/ModifierMessage';

type Props = ReactTimeoutProps & {
  message: IMessage,
  setMessages: Dispatch<SetStateAction<IMessage[]>>,
}

const Message = (props: Props) => {

  const { message, setMessages, setTimeout, clearTimeout } = props;
  const { id, type, data } = message;

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
        <AbilityMessage data={data as AbilityMessageData} />
      )}
      {type === MessageType.ITEM && (
        <ItemMessage data={data as ItemMessageData} />
      )}
      {type === MessageType.MODIFIER && (
        <ModifierMessage data={data as ModifierMessageData} />
      )}
    </Panel>
  );

}

export default React.memo(ReactTimeout(Message));
