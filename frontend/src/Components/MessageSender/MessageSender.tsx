import { Button, Input, Space } from 'antd';
import { useState } from 'react';
import { Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { MessageType } from '../../types';

type MessageSenderProps = {
  socket: Socket;
  setMessages: (messageArray: MessageType[]) => void;
  // this is worng it shouldnt have a need to have this passed to the sender, again context is simpler but my brain aint telling me how to fix this rn.
  messages: MessageType[];
};

// Look im no word smith
function MessageSender({ socket, setMessages, messages }: MessageSenderProps) {
  const [content, setContent] = useState('');
  const { userId } = useParams();
  const myUserId =
    localStorage.getItem('username') || 'do some actual error checking but using sqllite with context would be simpler';

  const sendMessage = (content: string, socket: Socket) => {
    socket.emit('directMessage', {
      content,
      to: userId
    });
    setMessages([...messages, { content: content, username: myUserId }]);
    setContent('');
  };

  return (
    <>
      <Space direction="vertical">
        <Input id="MessageBox" value={content} onChange={(e) => setContent(e.target.value)} />
        <Button type="primary" onClick={() => sendMessage(content, socket)}>
          Send Message
        </Button>
      </Space>
    </>
  );
}

export default MessageSender;
