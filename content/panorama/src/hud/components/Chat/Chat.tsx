import React, { useEffect, useState } from 'react';
import { useGameEvent, useNetTableValues } from 'react-panorama';
import { Message } from '../../types/chatTypes';
import { getHudElement } from '../../utils/HudElements';
import ChatMessage from './ChatMessage/ChatMessage';
import Container from './Container';

const MAX_MESSAGES = 15;

interface Props {
  hasPickedHero: boolean,
}

const Chat = (props: Props) => {

  const { hasPickedHero } = props;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    if (!isChatActive) {
      $.DispatchEvent("DropInputFocus", getHudElement('ChatInput')!);
    }
  }, [isChatActive])

  useEffect(() => {

    const chatControls = getHudElement("ChatControls");
    const chatMainPanel = getHudElement("ChatMainPanel");
    const chatInput = getHudElement("ChatInput");
    const placeholderText = getHudElement('PlaceholderText');

    chatInput!.style.paddingLeft = '10px';
    placeholderText!.style.visibility = 'collapse';

    for (let child of chatMainPanel!.Children()) {
      if (child != chatControls) {
        child.style.visibility = "collapse";
      }
    }

    for (let child of chatControls!.Children()) {
      if (child == chatInput) {
        continue;
      }
      child.style.visibility = "collapse";
    }

    chatInput!.SetPanelEvent("oninputsubmit", () => {
      // @ts-ignore
      GameEvents.SendCustomGameEventToServer("on_chat_input_submit", { playerId: Game.GetLocalPlayerID(), input: chatInput!.text });
      // @ts-ignore
      chatInput!.text = "";
      setIsChatActive(prevState => !prevState);
    });

    return () => chatInput!.ClearPanelEvent('oninputsubmit');

  }, []);

  useEffect(() => {
    const chat = getHudElement('HudChat');
    if (hasPickedHero) {
      chat!.style.marginBottom = '380px'
      chat!.style.marginLeft = '10px'
      chat!.style.horizontalAlign = 'left'
      chat!.style.verticalAlign = 'bottom'
      chat!.style.height = 'fit-children'
      chat!.style.width = '465px'
      chat!.style.y = '0px'
    } else {
      chat!.style.marginBottom = '230px'
      chat!.style.marginLeft = '75px'
      chat!.style.horizontalAlign = 'left'
      chat!.style.verticalAlign = 'bottom'
      chat!.style.height = 'fit-children'
      chat!.style.width = '565px'
      chat!.style.y = '0px'
    }
  }, [hasPickedHero]);

  useGameEvent('custom_player_chat', (event: Message) => {
    const isMuted = Game.IsPlayerMuted(event.playerid);
    if (!isMuted) {
      setMessages(prevState => {
        if (prevState.length > MAX_MESSAGES) {
          const newState = prevState.slice(0, prevState.length - 1);
          return [event, ...newState];
        }
        return [event, ...prevState]
      });
    }
  }, []);

  return (
    <Container>
      {messages.map(message => (
        <ChatMessage
          key={message.uuid}
          message={message}
        />
      ))}
    </Container>
  );

}

export default Chat;
