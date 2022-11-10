import React from 'react';
import { Socket } from 'socket.io-client';
import { MessageType } from '../../types';
import Message from '../Message';

type ChatHistoryProps = {
  socket: Socket;
  messages: MessageType[];
};

//add auto scroll
function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="message-history">
      {messages.map((message, index) => {
        return <Message message={message} key={index} />;
      })}
    </div>
  );
}

export default ChatHistory;
