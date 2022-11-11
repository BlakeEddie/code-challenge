import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface ISocketioContextState {
  socket: Socket | undefined;
  uid: string;
  username: string;
}

export const defaultSocketContextState: ISocketioContextState = {
  socket: undefined,
  uid: '',
  username: ''
};

export type TSocketContextActions = 'directMessage' | 'disconnect' | 'userDisconected';
export type TSocketContextPayload = string | string[] | Socket;

export interface ISocketioContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const SocketReducer = (state: ISocketioContextState, action: ISocketioContextActions) => {
  switch (action.type) {
    case 'directMessage':
      return { ...state, socket: action.payload as Socket };
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
