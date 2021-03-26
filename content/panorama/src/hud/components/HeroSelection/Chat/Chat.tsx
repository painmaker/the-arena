import React, { useEffect } from 'react';

type Props = {
  // ownProps
};

const Chat = (props: Props) => {

  useEffect(() => {
    const chat = $.GetContextPanel().GetParent()?.GetParent()?.GetParent()?.FindChild('HUDElements')?.FindChild('HudChat');
    if (chat) {
      chat.style.marginBottom = '-20px'
      chat.style.marginLeft = '75px'
      chat.style.horizontalAlign = 'left'
      chat.style.maxWidth = '565px'
    }
  }, []);

  return (
    <React.Fragment>

    </React.Fragment>
  );

}

export default Chat;
