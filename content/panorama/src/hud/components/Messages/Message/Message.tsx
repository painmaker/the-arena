import React, { Dispatch, SetStateAction, useState } from 'react';
import { Message as IMessage, AbilityMessageData, MessageType, ItemMessageData, ModifierMessageData } from '../Messages';
import { Styles } from './Styles';
import AbilityMessage from './AbilityMessage/AbilityMessage';
import ItemMessage from './ItemMessage/ItemMessage';
import ModifierMessage from './ModifierMessage/ModifierMessage';
import { useTimeout } from '../../../hooks/useTimeout';

type Props = {
  message: IMessage,
  setMessages: Dispatch<SetStateAction<IMessage[]>>,
}

const Message = (props: Props) => {

  const { message, setMessages } = props;
  const { id, type, data } = message;

  const [opacity, setOpacity] = useState('1.0');

  useTimeout(() => {
    setMessages(prevState => prevState.filter(msg => msg.id !== id));
  }, 5600);

  useTimeout(() => {
    setOpacity('0.0');
  }, 5000);

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

export default React.memo(Message);
