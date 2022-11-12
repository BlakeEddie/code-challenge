import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatHistory from '../../Components/ChatHistory';
import MessageSender from '../../Components/MessageSender';
import SocketioContext from '../../context/SocketioContext';

function Chat() {
  const { partnerUsername } = useContext(SocketioContext).SocketState;
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log('partner name ', partnerUsername);
    console.log('pageurl ', userId);
    //if a third user messages one of the participants steals the page over
    if (partnerUsername != '' && userId != partnerUsername) {
      console.log('redirect to userpage');
      navigate(`/chat/${partnerUsername}`);
    }

    if (partnerUsername == '' && userId != undefined) {
      console.log('redirect to homepage');
      navigate('/');
    }
  }, [partnerUsername, userId]);
  return (
    <div className="content chat">
      <h3>
        Your chat with <strong>{partnerUsername}</strong>
      </h3>
      <ChatHistory />
      <MessageSender />
    </div>
  );
}

export default Chat;
