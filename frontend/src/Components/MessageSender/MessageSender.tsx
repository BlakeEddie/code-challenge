import { Button, Input, Space } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import SocketioContext from '../../context/SocketioContext';

// Look im no word smith
function MessageSender() {
  const [content, setContent] = useState('');
  const { userId } = useParams();
  //move this into a standalone hook
  const { SocketDispatch, SocketState } = useContext(SocketioContext);

  const sendMessage = (content: string) => {
    console.log('send message from client');
    // this is lazy
    if (userId == undefined) {
      setContent('');
      return;
    }
    const messageToSend = {
      content,
      to: userId
    };

    // this is lazy
    if (SocketState.socket == undefined) {
      return;
    }

    SocketState.socket.emit('directMessage', messageToSend);
    // this is also lazy, also a little confusing because we need to enroll that we sent the message should just have another reducer method
    SocketDispatch({ type: 'directMessage', payload: { username: SocketState.username, content: content } });
    setContent('');
  };

  return (
    <>
      <Space direction="vertical">
        <Input id="MessageBox" value={content} onChange={(e) => setContent(e.target.value)} />
        <Button type="primary" onClick={() => sendMessage(content)}>
          Send Message
        </Button>
      </Space>
    </>
  );
}

export default MessageSender;
