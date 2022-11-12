import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { MessageType } from '../types';

export interface ISocketioContextState {
  socket: Socket | undefined;
  username: string;
  messages: MessageType[];
  partnerUsername: string;
}

export const defaultSocketContextState: ISocketioContextState = {
  socket: undefined,
  username: '',
  messages: [],
  partnerUsername: ''
};

export type TSocketContextActions = 'updateSocket' | 'directMessage' | 'userDisconected' | 'setUsername' | 'setPartner';
export type TSocketContextPayload = string | MessageType | Socket;

export interface ISocketioContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const SocketReducer = (state: ISocketioContextState, action: ISocketioContextActions): ISocketioContextState => {
  console.info(`reducer recived with action: ${action.type}`);
  const newState = { ...state };
  switch (action.type) {
    case 'directMessage':
      const message = action.payload as MessageType;
      newState.messages.push(message);
      if (newState.partnerUsername != message.username && message.username != newState.username) {
        newState.partnerUsername = message.username;
      }
      return newState;
    case 'updateSocket':
      return { ...state, socket: action.payload as Socket };
    case 'userDisconected':
      newState.messages = [];
      if (newState.partnerUsername == (action.payload as string)) {
        newState.partnerUsername = '';
      }
      return newState;
    case 'setUsername':
      newState.username = action.payload as string;
      return newState;
    case 'setPartner':
      newState.partnerUsername = action.payload as string;
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
