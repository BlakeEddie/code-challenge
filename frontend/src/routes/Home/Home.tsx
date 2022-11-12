/* eslint-disable prettier/prettier */
import { Button, Input, Space } from 'antd';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketioContext from '../../context/SocketioContext';


function Home() {
  const [userTo, setUserTo] = useState('');
  const navigate = useNavigate();
  const {SocketDispatch, SocketState} =  useContext(SocketioContext);


  useEffect(() => {
    //this redirects even if we are on diff page
    if (SocketState.partnerUsername != '') {
      console.log('redirect to userpage');
      navigate(`/chat/${SocketState.partnerUsername}`);
    }

  }, [SocketState.partnerUsername]);

  //outa spec but was quicker than passing the message around
  function startChatWith(userID:string) {
    SocketDispatch({type: 'setPartner', payload: userID});
    navigate(`/chat/${userID}`);
  }

  return (
    <div className='content'>
      <div>
        <h3>Your user details</h3>
        <p>Username: {SocketState.username}</p>
      </div>
      <Space direction='vertical'>
        <label htmlFor="userToTalkTo">Please enter a username you wish to chat with</label>
        <Input placeholder="username" value={userTo} onChange={(e) => setUserTo(e.target.value)} />
        <Button type="primary" onClick={() =>startChatWith(userTo)}>Start Chat</Button>
      </Space>
  </div>
  );
}

export default Home;
