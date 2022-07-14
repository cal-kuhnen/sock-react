import React, { useState } from 'react';

const Chat = () => {

  const [isExpanded, setExpanded] = useState(false);

  const collapseChat = () => {
    setExpanded(!isExpanded);
  }
  return (
    <div id="chat">
      <div className='chat-button' onClick={collapseChat}>
        the sock drawer
      </div>
      <iframe className={isExpanded ? 'minnit expanded' : 'minnit'} title='sock radio chat box' src="https://minnit.chat/sockDrawer?embed&&nickname="></iframe>
    </div>
  )
}

export default Chat;
