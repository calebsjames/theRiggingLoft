import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom"
import { TheRiggingLoft } from './TheRiggingLoft';

sessionStorage.setItem("app_user_id", 1)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TheRiggingLoft />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
