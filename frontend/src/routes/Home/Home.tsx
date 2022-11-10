/* eslint-disable prettier/prettier */
import { Button, Card, Input, Layout, Space } from 'antd';

import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';


type HomeProps = {
  socket: Socket;
  username: string
};

function Home({username, socket}: HomeProps) {
  const [userTo, setUserTo] = useState('');
  const navigate = useNavigate();

  //outa spec but was quicker than passing the message around
  function startChatWith(userID:string) {
    socket.emit('directMessageConnect', { to: userID });
    navigate(`/chat/${userID}`);
  }

  return (
  <Layout className="layout">
      <Content className='content' style={{ padding: '0 50px' }}>
        <div>
          <h3>Your user details</h3>
          <p>Username: {username}</p>
        </div>
        <Space direction='vertical'>
          <label htmlFor="userToTalkTo">Please enter a username you wish to chat with</label>
          <Input placeholder="username" value={userTo} onChange={(e) => setUserTo(e.target.value)} />
          <Button type="primary" onClick={() =>startChatWith(userTo)}>Start Chat</Button>
        </Space>
    </Content>
  </Layout>
  );
}

export default Home;
