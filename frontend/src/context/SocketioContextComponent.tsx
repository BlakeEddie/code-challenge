import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSocket } from '../hooks/useSocketio';
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from './SocketioContext';

//using any here just incase this needs to be used for something im not expecting otherwise ReactNode
export type ISocketContextComponentProps = PropsWithChildren<any>;

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
  const { children } = props;
  //use proper user object and context if there was a proper login
  const [username] = useState(uuid());

  const socket = useSocket('ws://localhost:3000', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false
  });

  const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);

  useEffect(() => {
    //if using proper auth we may want to split connection and auth handshake up
    socket.auth = { username: username };
    console.info(`my username is ${username}`);
    socket.connect();
    // SocketDispatch({ type: 'update_socket', payload: socket });
    StartListeners();
  }, []);

  const StartListeners = () => {
    socket.on('directMessage', (username: string, content: string) => {
      console.info('message recived');
      console.debug(`User connected message received from ${username} with content ${content}`);
      //   SocketDispatch({ type: 'update_users', payload: users });
    });

    socket.on('userDisconected', (username: string) => {
      console.info(`${username} disconnected`);
      //   SocketDispatch({ type: 'userDisconected', payload: uid });
    });
  };

  return <SocketContextProvider value={{ SocketState, SocketDispatch }}>{children}</SocketContextProvider>;
};

export default SocketContextComponent;
