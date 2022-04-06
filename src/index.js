import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {TodoContextProvider} from "./context";


ReactDOM.render(
    <TodoContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </TodoContextProvider>
  ,
  document.getElementById('root')
);


