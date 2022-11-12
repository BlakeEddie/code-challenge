import { useEffect, useRef } from 'react';
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

// custom hook to expose the socket to different components and auto clean up on page leaving
export const useSocket = (url: string, options?: Partial<ManagerOptions & SocketOptions> | undefined): Socket => {
  const { current: socket } = useRef(io(url, options));

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return socket;
};
