import { useContext } from 'react';
import SocketioContext from '../../context/SocketioContext';
import Message from '../Message';

//add auto scroll
function ChatHistory() {
  const { messages } = useContext(SocketioContext).SocketState;
  console.log(messages);
  return (
    <div className="message-history">
      {messages.map((message, index) => {
        return <Message message={message} key={index} />;
      })}
    </div>
  );
}

export default ChatHistory;
