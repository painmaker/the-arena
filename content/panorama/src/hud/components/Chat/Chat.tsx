import React, { useEffect, useState } from 'react';
import { useGameEvent, useNetTableValues } from 'react-panorama';
import { HUD_THINK_FAST } from '../../App';
import { Message } from '../../types/chatTypes';
import { getHudElement } from '../../utils/HudElements';
import ChatMessage from './ChatMessage/ChatMessage';
import ReactTimeout, { ReactTimeoutProps } from 'react-timeout'

const MAX_MESSAGES = 15;

type Props = ReactTimeoutProps & {
  hasPickedHero: boolean,
}

const Chat = (props: Props) => {

  const { setInterval, clearInterval } = props;

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;
  const hasPickedHero = Object.values(heroes).find(hero => hero.playerID === Players.GetLocalPlayer())?.picked === 1;
  const [messages, setMessages] = useState<Message[]>([]);
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
    <Panel
      style={{
        width: hasPickedHero ? '465px' : '565px',
        height: '290px',
        flowChildren: 'down',
        verticalAlign: 'bottom',
        horizontalAlign: 'left',
        marginBottom: hasPickedHero ? '414px' : '264px',
        marginLeft: hasPickedHero ? '10px' : '75px',
        padding: '10px',
        backgroundColor: isChatActive ? 'rgba(0, 0, 0, 0.7)' : 'none',
        borderRadius: '0px 0px 5px 5px',
        transform: 'scaleY(-1)',
        overflow: 'clip',
        zIndex: 10,
      }}>
      {messages.map(message => (
        <ChatMessage
          key={message.uuid}
          message={message}
        />
      ))}
    </Panel>
  );

}

export default ReactTimeout(Chat);
