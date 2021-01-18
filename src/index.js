import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextLoginProvider } from './ContextLoginProvider';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './assets/main.css';
import './assets/custom.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextLoginProvider>
        <App />
      </ContextLoginProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
