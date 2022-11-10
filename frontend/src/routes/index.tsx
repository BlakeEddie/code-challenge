import { useEffect } from 'react';
import { Routes as Switch, Route, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';

import config from '../config';

// Routes
import Chat from './Chat';
import Home from './Home';

if (!localStorage.getItem('username')) {
  localStorage.setItem('username', uuid());
}
const username = localStorage.getItem('username') || 'fallback to check later';
// Would probably change this to a context with a reducer so it dosen't need to be manually passed down and can be more compact.
// not sure from the spec if im allowed to change what was already written or not so just leaving it
const socket = io(config.SOCKET_ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket'],
  auth: {
    username: username
  }
});

export default function Routes() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('directMessageConnect', ({ username }) => {
      navigate(`/chat/${username}`);
    });
  }, [socket]);

  return (
    <Switch>
      {<Route path="/" element={<Home socket={socket} username={username} />} />}
      {<Route path="/chat/:userId" element={<Chat socket={socket} />} />}
    </Switch>
  );
}
