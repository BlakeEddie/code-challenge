import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SocketContextComponent from './context/SocketioContextComponent';
import Routes from './routes';
import './_index.scss';
// had to remove strict as reducer gets called twice in development mode
ReactDOM.render(
  <SocketContextComponent>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </SocketContextComponent>,
  document.getElementById('root')
);
