import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { MessageType } from '../types';

export interface ISocketioContextState {
  socket: Socket | undefined;
  username: string;
  messages: MessageType[];
}

export const defaultSocketContextState: ISocketioContextState = {
  socket: undefined,
  username: '',
  messages: []
};

export type TSocketContextActions = 'updateSocket' | 'directMessage' | 'userDisconected';
export type TSocketContextPayload = string | MessageType | Socket;

export interface ISocketioContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const SocketReducer = (state: ISocketioContextState, action: ISocketioContextActions): ISocketioContextState => {
  console.info(`message recived with action: ${action.type}`);
  const newState = { ...state };
  switch (action.type) {
    case 'directMessage':
      newState.messages.push(action.payload as MessageType);
      return newState;
    case 'updateSocket':
      return { ...state, socket: action.payload as Socket };
    case 'userDisconected':
      newState.messages = [];
      return newState;
    default:
      return state;
  }
};

export interface ISocketioContextProps {
  SocketState: ISocketioContextState;
  SocketDispatch: React.Dispatch<ISocketioContextActions>;
}

const SocketioContext = createContext<ISocketioContextProps>({
  SocketState: defaultSocketContextState,
  SocketDispatch: () => {}
});

export const SocketContextConsumer = SocketioContext.Consumer;
export const SocketContextProvider = SocketioContext.Provider;

export default SocketioContext;
