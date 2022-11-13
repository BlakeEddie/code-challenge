import React, { PropsWithChildren, ReactNode, useEffect, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import { useSocket } from '../hooks/useSocketio';
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from './SocketioContext';
import config from '../config';
import { MessageType, UserDisconnectType } from '../types';

//using any here just incase this needs to be used for something im not expecting otherwise ReactNode
export type ISocketContextComponentProps = PropsWithChildren<ReactNode>;

if (!localStorage.getItem('username')) {
  localStorage.setItem('username', uuid());
}
//use proper user object and context if there was a proper login and will likely be in its own context as well,
//never should be '' context would deal with this
const username = localStorage.getItem('username') || '';

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
  const { children } = props;
  const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);

  const socket = useSocket(config.SOCKET_ENDPOINT, {
    transports: ['websocket', 'polling', 'flashsocket'],
    reconnectionAttempts: 3,
    reconnectionDelay: 3000,
    autoConnect: false
  });

  useEffect(() => {
    //if using proper auth we may want to split connection and auth handshake up
    socket.auth = { username: username };
    console.info(`my username is ${username}`);
    socket.connect();
    SocketDispatch({ type: 'updateSocket', payload: socket });
    SocketDispatch({ type: 'setUsername', payload: username });
    console.log('Start Listners');
    StartListeners();
    return () => {
      //remove listners only really matters on hot reload from what I remember, would be able to put strict back likely
      StopListeners();
    };
  }, []);

  const StartListeners = () => {
    socket.on('directMessage', (message: MessageType) => {
      console.info('message recived');
      console.debug(`User connected message received from ${username} with content ${message}`);
      SocketDispatch({ type: 'directMessage', payload: message });
    });

    socket.on('userDisconected', (userDC: UserDisconnectType) => {
      //bad should just allow null passing
      SocketDispatch({ type: 'userDisconected', payload: userDC.username });
    });
  };
  const StopListeners = () => {
    socket.off('directMessage');
    socket.off('userDisconected');
  };

  return <SocketContextProvider value={{ SocketState, SocketDispatch }}>{children}</SocketContextProvider>;
};

export default SocketContextComponent;
