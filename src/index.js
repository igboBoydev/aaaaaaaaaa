import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { AppProvider } from './store/context';

// css
import './index.css'

const Index = () => {
  return (
    <App />
  )
}

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Index />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

