import React, { useRef, useState } from 'react';
import { useGameEvent } from 'react-panorama';
import Message from './Message/Message';
import { Styles } from './Styles';

export enum MessageType {
  ABILITY = "ABILITY",
  ITEM = "ITEM",
}

export interface Message {
  id: number,
  type: MessageType,
  data: AbilityMessageData | ItemMessageData
}

export interface AbilityMessageData {
  unit: EntityIndex,
  ability: AbilityEntityIndex,
}

export interface ItemMessageData {
  unit: EntityIndex,
  item: ItemEntityIndex,
}

type Props = {
  // ownProps
}

const Messages = (props: Props) => {

  const [messages, setMessages] = useState<Message[]>([]);
  const messageID = useRef(-1_000_000);

  useGameEvent("on_ability_alerted", (event) => {
    messageID.current = messageID.current + 1;
    setMessages(prevState => {
      const newState = [...prevState, {
        id: messageID.current,
        type: MessageType.ABILITY,
        data: { unit: event.selectedUnit, ability: event.ability }
      }]
      return newState;
    })
  }, []);

  return (
    <Panel style={Styles.Container()}>
      {messages.reverse().map(message => {
        return (
          <Message
            key={message.id}
            message={message}
            setMessages={setMessages}
          />
        )
      })}
    </Panel>
  );

}

export default Messages;
