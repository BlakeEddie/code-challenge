import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SocketContextComponent from './context/SocketioContextComponent';
import Routes from './routes';
import './_index.scss';

ReactDOM.render(
  <React.StrictMode>
    <SocketContextComponent>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </SocketContextComponent>
  </React.StrictMode>,
  document.getElementById('root')
);
