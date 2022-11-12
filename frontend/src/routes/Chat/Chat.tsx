import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import ChatHistory from '../../Components/ChatHistory';
import MessageSender from '../../Components/MessageSender';
import { MessageType } from '../../types';

type ChatProps = {
  socket: Socket;
};

function Chat({ socket }: ChatProps) {
  const { userId } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('directMessage', ({ content, username }) => {
      console.log('mesage');
      setMessages([...messages, { content: content, username: username }]);
    });

    socket.on('userDisconected', ({ username }) => {
      if (username == userId) {
        navigate('/');
      }
    });
  }, [socket, messages]);
  return (
    <div className="content chat">
      <h3>
        Your chat with <strong> {userId} </strong>
      </h3>
      <ChatHistory socket={socket} messages={messages} />
      <MessageSender socket={socket} setMessages={setMessages} messages={messages} />
    </div>
  );
}

export default Chat;
