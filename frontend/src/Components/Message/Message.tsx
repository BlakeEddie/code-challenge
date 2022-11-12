import { useContext } from 'react';
import SocketioContext from '../../context/SocketioContext';
import { MessageType } from '../../types';

type MessageProps = {
  message: MessageType;
  children?: string;
};

// Can use the username later for colouring depending on self or other source of message
function Message({ message }: MessageProps) {
  const { username } = useContext(SocketioContext).SocketState;
  const self = message.username == username ? 'self' : '';
  const classidentifier = `message ${self}`;
  return <p className={classidentifier}>{message.content}</p>;
}

export default Message;
